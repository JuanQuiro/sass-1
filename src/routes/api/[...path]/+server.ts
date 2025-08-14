import type { RequestHandler } from '@sveltejs/kit';
import { BACKEND_BASE, ALLOWED_API_PATHS } from '$lib/api/config';

function normalize(p: string): string {
  if (!p.startsWith('/')) p = '/' + p;
  return p.replace(/\/+/, '/');
}

function isAllowed(path: string): boolean {
  // Allow base resource prefixes from allowlist
  for (const allowed of ALLOWED_API_PATHS) {
    if (path === allowed) return true;
    if (path.startsWith(allowed + '/')) return true;
  }
  return false;
}

async function forward(event: Parameters<RequestHandler>[0]) {
  const { request, params, url, cookies } = event;
  const pathParam = params.path ?? '';
  const path = normalize('/' + pathParam);

  if (!isAllowed(path)) {
    return new Response(JSON.stringify({ error: 'Not allowed' }), { status: 400 });
  }

  // Build target URL with original query string
  const target = new URL(BACKEND_BASE + path);
  url.searchParams.forEach((v, k) => target.searchParams.set(k, v));

  // Prepare headers
  const headers = new Headers();
  headers.set('accept', 'application/json');
  // propagate content-type if JSON
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  // Auth token from cookie
  const token = cookies.get('session');
  if (token) headers.set('authorization', `Bearer ${token}`);
  try {
    const auth = headers.get('authorization') || '';
    console.info('[BFF] auth header present:', Boolean(auth), auth ? auth.slice(0, 20) + '…' : '');
  } catch {}

  // Forward backend session cookie if present
  const backendCookie = cookies.get('backend_cookie');
  if (backendCookie) {
    const existing = request.headers.get('cookie');
    const merged = existing ? `${existing}; ${backendCookie}` : backendCookie;
    headers.set('cookie', merged);
  }

  const method = request.method;
  let body: BodyInit | undefined = undefined;
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      // Buffer the body to avoid undici's duplex requirement
      const buf = await request.arrayBuffer();
      body = buf;
    } catch {
      body = undefined;
    }
  }

  const res = await fetch(target, { method, headers, body });
  try { console.info('[BFF]', method, target.pathname, '->', res.status); } catch {}

  // Clone response to access body
  const ct = res.headers.get('content-type') ?? '';
  const isJson = ct.includes('application/json');
  let data: any = isJson ? await res.clone().json().catch(() => null) : await res.clone().text();

  // If login/register returned a token, persist it in httpOnly cookie
  if (res.ok && (path.startsWith('/auth/login') || path.startsWith('/auth/register'))) {
    try {
      // 1) Try Authorization header on response (non-standard but possible)
      let authHeader = res.headers.get('authorization') || '';
      if (authHeader.toLowerCase().startsWith('bearer ')) authHeader = authHeader.slice(7).trim();

      // 2) Try JSON body fields (including shallow nested) or parse plain text
      const tokenResp = typeof data === 'string' ? (() => { try { return JSON.parse(data as string); } catch { return data; } })() : data;
      const candidates: string[] = [];
      const pushIf = (s?: unknown) => { if (typeof s === 'string') candidates.push(s); };
      if (tokenResp && typeof tokenResp === 'object') {
        const t = tokenResp as any;
        pushIf(t.token); pushIf(t.access_token); pushIf(t.jwt); pushIf(t.id_token);
        // shallow nested
        for (const k of Object.keys(t)) {
          const v = t[k];
          if (v && typeof v === 'object') { pushIf((v as any).token); pushIf((v as any).access_token); pushIf((v as any).jwt); }
        }
      }
      // 3) JWT-like pattern in text
      const textBody = typeof tokenResp === 'string' ? tokenResp : (typeof data === 'string' ? data : '');
      const jwtLike = textBody && (textBody.match(/[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/)?.[0] || '');

      const newToken = authHeader || candidates.find((c) => /\./.test(c) && c.length > 20) || jwtLike;
      if (newToken) {
        cookies.set('session', newToken, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: false, // set true if behind https domain
          maxAge: 60 * 60 * 24 * 7 // 7 days
        });
        try { console.info('[BFF] captured JWT from login/register:', newToken.slice(0, 16) + '…'); } catch {}
      } else {
        try { console.warn('[BFF] no JWT found in login/register response'); } catch {}
      }
    } catch {}
  }

  // If backend indicates unauthorized, clear cookie
  if (res.status === 401) {
    cookies.delete('session', { path: '/' });
  }

  // Capture backend Set-Cookie and mirror into our own httpOnly cookie for subsequent proxy calls
  try {
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      const firstPair = setCookie.split(',')[0]?.split(';')[0]?.trim();
      if (firstPair && firstPair.includes('=')) {
        // Store the exact cookie pair; it will be sent back to backend on next calls
        cookies.set('backend_cookie', firstPair, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: false,
          maxAge: 60 * 60 * 24 * 7
        });
      }
    }
  } catch {}

  // Build response to client
  const outHeaders = new Headers();
  if (ct) outHeaders.set('content-type', ct);

  return new Response(isJson ? JSON.stringify(data) : (data as string), {
    status: res.status,
    headers: outHeaders
  });
}

export const GET: RequestHandler = async (e) => forward(e);
export const POST: RequestHandler = async (e) => forward(e);
export const PUT: RequestHandler = async (e) => forward(e);
export const DELETE: RequestHandler = async (e) => forward(e);
