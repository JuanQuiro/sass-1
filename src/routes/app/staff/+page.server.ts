import type { Actions, PageServerLoad } from './$types';
import { staffApi } from '$lib/api/staff';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
  const staff = await staffApi.list(fetch).catch(() => ({ data: [] as any[] }));
  return { staff: staff.data };
};

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const role = String(form.get('role') || '').trim();
    if (!name) return fail(400, { error: 'Nombre requerido' });
    try {
      await staffApi.create({ name, role }, fetch);
      return { success: true };
    } catch (e: any) {
      return fail(e?.status || 400, { error: e?.data?.message || 'No se pudo crear' });
    }
  },
  update: async ({ request, fetch }) => {
    const form = await request.formData();
    const id = String(form.get('id') || '').trim();
    const name = String(form.get('name') || '').trim();
    const role = String(form.get('role') || '').trim();
    if (!id) return fail(400, { error: 'ID requerido' });
    try {
      await staffApi.update(id, { name, role }, fetch);
      return { success: true };
    } catch (e: any) {
      return fail(e?.status || 400, { error: e?.data?.message || 'No se pudo actualizar' });
    }
  },
  delete: async ({ request, fetch }) => {
    const form = await request.formData();
    const id = String(form.get('id') || '').trim();
    if (!id) return fail(400, { error: 'ID requerido' });
    try {
      await staffApi.remove(id, fetch);
      return { success: true };
    } catch (e: any) {
      return fail(e?.status || 400, { error: e?.data?.message || 'No se pudo eliminar' });
    }
  }
};
