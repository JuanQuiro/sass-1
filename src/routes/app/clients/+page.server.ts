import type { Actions, PageServerLoad } from './$types';
import { clientsApi } from '$lib/api/clients';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
  const clients = await clientsApi.list(fetch).catch(() => ({ data: [] as any[] }));
  return { clients: clients.data };
};

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    if (!name) return fail(400, { error: 'Nombre requerido' });
    try {
      await clientsApi.create({ name, phone }, fetch);
      return { success: true };
    } catch (e: any) {
      return fail(e?.status || 400, { error: e?.data?.message || 'No se pudo crear' });
    }
  }
};
