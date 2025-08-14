import type { PageServerLoad } from './$types';
import { permissionsApi } from '$lib/api/permissions';

export const load: PageServerLoad = async ({ fetch }) => {
  const me = await permissionsApi.me(fetch).catch(() => ({ data: [] as string[] }));
  return { perms: me.data };
};
