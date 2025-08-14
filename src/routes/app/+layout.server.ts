import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { permissionsApi } from '$lib/api/permissions';

export const load: LayoutServerLoad = async ({ fetch, url, cookies }) => {
  // Permisivo: si hay cookie de sesión, deja entrar aunque /me/permissions falle
  const token = cookies.get('session');
  if (!token) {
    throw redirect(302, `/auth/login?next=${encodeURIComponent(url.pathname)}`);
  }
  try {
    const perms = await permissionsApi.me(fetch);
    return { perms: perms.data, authed: true };
  } catch (e) {
    // No bloquear el acceso si el endpoint de permisos no está disponible o devuelve 404/401
    try { console.warn('[app guard] permisos no disponibles, continuando'); } catch {}
    return { perms: [], authed: true };
  }
};
