import type { RequestEvent } from '@sveltejs/kit';

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiRequestOptions<TBody = unknown> {
  method?: ApiMethod;
  path: string; // BFF path starting with '/api/...'
  query?: Record<string, string | number | boolean | undefined>;
  body?: TBody;
  fetchFn?: typeof fetch; // prefer SvelteKit's fetch in load or actions
  event?: RequestEvent; // optional, in case we need headers/cookies (SSR)
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  status: number;
  ok: boolean;
  data: T;
}

function buildQuery(q?: ApiRequestOptions['query']): string {
  if (!q) return '';
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (v === undefined) continue;
    params.set(k, String(v));
  }
  const s = params.toString();
  return s ? `?${s}` : '';
}

export async function apiRequest<T = unknown, TBody = unknown>(opts: ApiRequestOptions<TBody>): Promise<ApiResponse<T>> {
  const { path, method = 'GET', body, query, headers = {} } = opts;
  const fetchImpl = opts.fetchFn ?? fetch;

  const url = `${path}${buildQuery(query)}`;

  const res = await fetchImpl(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include' // include cookies for auth
  });

  let data: any = null;
  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    data = await res.json();
  } else {
    data = (await res.text()) as any;
  }

  if (!res.ok) {
    // Normalize error shape
    const err: any = new Error('API Error');
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return { status: res.status, ok: res.ok, data } as ApiResponse<T>;
}

// Convenience helpers for BFF paths
export const bff = {
  get: <T>(path: string, query?: ApiRequestOptions['query'], fetchFn?: typeof fetch) =>
    apiRequest<T>({ method: 'GET', path, query, fetchFn }),
  post: <T, B = unknown>(path: string, body?: B, fetchFn?: typeof fetch) =>
    apiRequest<T, B>({ method: 'POST', path, body, fetchFn }),
  put: <T, B = unknown>(path: string, body?: B, fetchFn?: typeof fetch) =>
    apiRequest<T, B>({ method: 'PUT', path, body, fetchFn }),
  del: <T>(path: string, fetchFn?: typeof fetch) =>
    apiRequest<T>({ method: 'DELETE', path, fetchFn })
};
