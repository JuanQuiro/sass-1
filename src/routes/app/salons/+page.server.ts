import type { Actions, PageServerLoad } from './$types';
import { salonsApi } from '$lib/api/salons';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
  const salons = await salonsApi.list(fetch).catch(() => ({ data: [] as any[] }));
  return { salons: salons.data };
};

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    if (!name) return fail(400, { error: 'Nombre requerido' });
    try {
      await salonsApi.create({ name }, fetch);
      return { success: true };
    } catch (e: any) {
      return fail(e?.status || 400, { error: e?.data?.message || 'No se pudo crear' });
    }
  },
  delete: async ({ request, fetch }) => {
    const form = await request.formData();
    const id = String(form.get('id') || '').trim();
    if (!id) return fail(400, { error: 'ID requerido' });
    try {
      await salonsApi.remove(id, fetch);
      return { success: true };
    } catch (e: any) {
      return fail(e?.status || 400, { error: e?.data?.message || 'No se pudo eliminar' });
    }
  }
};
