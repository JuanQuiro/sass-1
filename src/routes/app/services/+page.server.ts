import type { Actions, PageServerLoad } from './$types';
import { servicesApi } from '$lib/api/services';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
  const services = await servicesApi.list(fetch).catch(() => ({ data: [] as any[] }));
  return { services: services.data };
};

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const price = Number(form.get('price') || 0);
    const duration_minutes = Number(form.get('duration') || 0);
    if (!name) return fail(400, { error: 'Nombre requerido' });
    try {
      await servicesApi.create({ name, price, duration_minutes }, fetch);
      return { success: true };
    } catch (e: any) {
      return fail(e?.status || 400, { error: e?.data?.message || 'No se pudo crear' });
    }
  }
};
