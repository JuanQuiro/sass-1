import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request, fetch, cookies, url }) => {
    const form = await request.formData();
    const identity = String(form.get('identity') || '').trim();
    const password = String(form.get('password') || '');

    if (!identity || !password) {
      return fail(400, { error: 'Credenciales incompletas' });
    }

function pickField(json?: Record<string, unknown> | null, detail?: string) {
  const jf = json && typeof json.field === 'string' ? (json.field as string) : undefined;
  if (jf) return jf;
  const d = (detail || '').toLowerCase();
  if (/email/.test(d)) return 'email';
  if (/user(name)?|usuario/.test(d)) return 'username';
  if (/password|contraseña/.test(d)) return 'password';
  return undefined;
}

    try {
      // Raw fetch to capture plain-text errors
      const body = identity.includes('@')
        ? { email: identity, password }
        : { username: identity, password };
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: '*/*' },
        body: JSON.stringify(body)
      });

      console.info('[login] backend status:', res.status);

      // Treat any 3xx from backend as success
      if (res.status >= 300 && res.status < 400) {
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
        return fail(res.status, { error: httpErrorMessage(res.status, detail), field, httpStatus: res.status, detail, rawJson: json });
      }

      // Any 2xx is success: redirect immediately. The BFF will have set the JWT in the 'session' cookie if provided by backend.
      {
        const base = url.searchParams.get('redirectTo') || '/app';
        const hasQuery = base.includes('?');
        const target = base.includes('welcome=1') ? base : `${base}${hasQuery ? '&' : '?'}welcome=1`;
        throw redirect(302, target);
      }
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
      return fail(err?.status || 400, { error: message || 'No se pudo iniciar sesión', field, httpStatus: err?.status || 400, detail });
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
  return clean ? `${base}: ${clean}` : base;
}
