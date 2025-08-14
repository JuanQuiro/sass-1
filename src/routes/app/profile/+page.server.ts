import type { PageServerLoad } from './$types';
import { permissionsApi } from '$lib/api/permissions';

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

export const load: PageServerLoad = async ({ cookies, fetch }) => {
  const token = cookies.get('session') || '';
  const decoded = token ? decodeJwt(token) : null;
  let perms: string[] = [];
  try {
    const res = await permissionsApi.me(fetch);
    perms = res.data || [];
  } catch {
    perms = [];
  }
  return { token, decoded, perms };
};
