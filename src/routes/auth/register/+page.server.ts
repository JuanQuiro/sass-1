import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
// Using fixed API base; replace if you later define a public env var

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request, fetch, cookies, url }) => {
    const form = await request.formData();
    const email = String(form.get('email') || '').trim() || undefined;
    const password = String(form.get('password') || '');

    if (!email || !password) {
      return fail(400, { error: 'Email y contraseña son requeridos', field: !email ? 'email' : 'password', httpStatus: 400 });
    }

function pickField(json?: Record<string, unknown> | null, detail?: string) {
  // Prefer explicit field from JSON if provided
  const jf = json && typeof json.field === 'string' ? (json.field as string) : undefined;
  if (jf) return jf;
  const d = (detail || '').toLowerCase();
  if (/email/.test(d)) return 'email';
  if (/user(name)?|usuario/.test(d)) return 'username';
  if (/password|contraseña/.test(d)) return 'password';
  return undefined;
}

    try {
      const API = 'http://173.249.205.142:8080';
      // Call real backend directly; per Swagger, register expects email + password
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: '*/*' },
        body: JSON.stringify({ email, password })
      });

      // Log backend status for diagnostics
      console.info('[register] backend status:', res.status);

      // Treat any 3xx from backend as success to avoid SvelteKit failure payloads via enhance
      if (res.status >= 300 && res.status < 400) {
        // Best-effort: try to read any token if body exists as JSON
        let token: string | undefined;
        try {
          const ct302 = res.headers.get('content-type') || '';
          if (ct302.includes('application/json')) {
            const j = (await res.json().catch(() => null)) as Record<string, unknown> | null;
            if (j) {
              token =
                (typeof j.token === 'string' && j.token) ||
                (typeof j.access_token === 'string' && j.access_token) ||
                (typeof j.jwt === 'string' && j.jwt) ||
                undefined;
            }
          }
        } catch (e) {
          // Non-critical: backend 3xx may not include JSON body; safe to ignore
        }
        if (token) {
          cookies.set('session', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
        }
        const base = url.searchParams.get('redirectTo') || '/app';
        const hasQuery = base.includes('?');
        const target = base.includes('welcome=1') ? base : `${base}${hasQuery ? '&' : '?'}welcome=1`;
        throw redirect(302, target);
      }

      if (!res.ok) {
        const ct = res.headers.get('content-type') || '';
        let text = '';
        let json: Record<string, unknown> | null = null;
        if (ct.includes('application/json')) {
          json = await res.json().catch(() => null);
        }
        if (!json) text = await res.text().catch(() => '');
        const detail = json && typeof json.message === 'string' ? json.message : (typeof json?.error === 'string' ? json.error : text);
        const field = pickField(json, detail);
        const message = httpErrorMessage(res.status, detail || '');
        return fail(res.status, { error: message, field, httpStatus: res.status, detail, rawJson: json });
      }

      const data: unknown = await res.json().catch(() => ({}));

      // Fallback cookie set if BFF didn't set it
      let token: string | undefined;
      if (data && typeof data === 'object') {
        const d = data as Record<string, unknown>;
        token =
          (typeof d.token === 'string' && d.token) ||
          (typeof d.access_token === 'string' && d.access_token) ||
          (typeof d.jwt === 'string' && d.jwt) ||
          undefined;
      }
      if (token) {
        cookies.set('session', token, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
      }

      const base = url.searchParams.get('redirectTo') || '/app';
      const hasQuery = base.includes('?');
      const target = base.includes('welcome=1') ? base : `${base}${hasQuery ? '&' : '?'}welcome=1`;
      throw redirect(302, target);
    } catch (e: unknown) {
      // If this is a SvelteKit redirect, rethrow so enhance receives a proper redirect
      if (e && typeof e === 'object' && 'status' in (e as any) && 'location' in (e as any)) {
        const st = (e as any).status;
        if (typeof st === 'number' && st >= 300 && st < 400) throw e;
      }
      const err = e as { status?: number; data?: unknown; message?: string };
      const detail = (typeof err?.data === 'string' && err.data) || err?.message || '';
      const message = httpErrorMessage(err?.status, detail);
      const field = pickField(undefined, detail);
      return fail(err?.status || 400, { error: message || 'No se pudo crear la cuenta', field, httpStatus: err?.status || 400, detail });
    }
  }
};

function httpErrorMessage(status?: number, detail?: string) {
  const clean = (detail || '').trim();
  const byStatus: Record<number, string> = {
    400: 'Solicitud inválida',
    401: 'No autorizado',
    403: 'Acceso prohibido',
    404: 'Recurso no encontrado',
    409: 'Conflicto',
    422: 'Datos inválidos',
    429: 'Demasiadas solicitudes'
  };
  if (!status) return clean || 'Error desconocido';
  const base = byStatus[status] || (status >= 500 ? 'Error interno del servidor' : 'Error');
  // Prefer explicit backend detail when provided
  return clean ? `${base}: ${clean}` : base;
}
