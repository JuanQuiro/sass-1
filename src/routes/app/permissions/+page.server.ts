import type { Actions, PageServerLoad } from './$types';
import { permissionsApi } from '$lib/api/permissions';
import { fail } from '@sveltejs/kit';

function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const json = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getUserId(decoded: Record<string, unknown> | null): string | number | null {
  if (!decoded) return null;
  const candidates = [decoded.sub, decoded.user_id, decoded.id, decoded.userId];
  for (const c of candidates) {
    if (typeof c === 'string' || typeof c === 'number') return c as any;
  }
  return null;
}

export const load: PageServerLoad = async ({ cookies, fetch }) => {
  const token = cookies.get('session') || '';
  const decoded = token ? decodeJwt(token) : null;
  const userId = getUserId(decoded);
  let perms: string[] = [];
  try {
    if (userId != null) {
      const res = await permissionsApi.getUser(userId, fetch);
      perms = res.data || [];
    } else {
      const res = await permissionsApi.me(fetch);
      perms = res.data || [];
    }
  } catch {
    perms = [];
  }
  return { perms, userId };
};

export const actions: Actions = {
  add: async ({ request, fetch, cookies }) => {
    const form = await request.formData();
    const perm = String(form.get('perm') || '').trim();
    const token = cookies.get('session') || '';
    const decoded = token ? decodeJwt(token) : null;
    const userId = getUserId(decoded);
    if (!userId) return fail(400, { error: 'No se pudo determinar el usuario' });
    if (!perm) return fail(400, { error: 'Permiso requerido' });
    try {
      // Obtener permisos actuales y agregar el nuevo
      const current = await permissionsApi.getUser(userId, fetch).then(r => r.data || []).catch(() => [] as string[]);
      const next = Array.from(new Set([...(current || []), perm]));
      await permissionsApi.setUser(userId, next, fetch);
      return { success: true };
    } catch (e: any) {
      const detail = typeof e?.data === 'string' ? e.data : e?.data?.message || e?.message;
      return fail(e?.status || 400, { error: detail || 'No se pudo agregar' });
    }
  },
  revoke: async ({ request, fetch, cookies }) => {
    const form = await request.formData();
    const perm = String(form.get('perm') || '').trim();
    const token = cookies.get('session') || '';
    const decoded = token ? decodeJwt(token) : null;
    const userId = getUserId(decoded);
    if (!userId) return fail(400, { error: 'No se pudo determinar el usuario' });
    if (!perm) return fail(400, { error: 'Permiso requerido' });
    try {
      await permissionsApi.revoke(userId, perm, fetch);
      return { success: true };
    } catch (e: any) {
      const detail = typeof e?.data === 'string' ? e.data : e?.data?.message || e?.message;
      return fail(e?.status || 400, { error: detail || 'No se pudo revocar' });
    }
  }
};
