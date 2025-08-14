import type { Actions, PageServerLoad } from './$types';
import { salonsApi } from '$lib/api/salons';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const page = Number(url.searchParams.get('page') || '1') || 1;
  const per_page = Number(url.searchParams.get('per_page') || '20') || 20;
  const q = url.searchParams.get('q') || undefined;
  const salons = await salonsApi
    .list({ page, per_page, q }, fetch)
    .catch((e: any) => ({ data: [], error: e?.data || e?.message }));
  return { salons: (salons as any).data, page, per_page, q, error: (salons as any).error };
};

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const address = String(form.get('address') || '').trim();
    if (!name) return fail(400, { error: 'Nombre requerido' });
    if (!address) return fail(400, { error: 'Dirección requerida' });
    try {
      await salonsApi.create({ name, address }, fetch);
      return { success: true };
    } catch (e: any) {
      const detail = typeof e?.data === 'string' ? e.data : e?.data?.message || e?.message;
      return fail(e?.status || 400, { error: detail || 'No se pudo crear' });
    }
  },
  update: async ({ request, fetch }) => {
    const form = await request.formData();
    const id = String(form.get('id') || '').trim();
    const name = String(form.get('name') || '').trim();
    const address = String(form.get('address') || '').trim();
    if (!id) return fail(400, { error: 'ID requerido' });
    if (!name) return fail(400, { error: 'Nombre requerido' });
    if (!address) return fail(400, { error: 'Dirección requerida' });
    try {
      await salonsApi.update(id, { name, address }, fetch);
      return { success: true };
    } catch (e: any) {
      const detail = typeof e?.data === 'string' ? e.data : e?.data?.message || e?.message;
      return fail(e?.status || 400, { error: detail || 'No se pudo actualizar' });
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
