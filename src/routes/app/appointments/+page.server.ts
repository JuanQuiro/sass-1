import type { Actions, PageServerLoad } from './$types';
import { appointmentsApi } from '$lib/api/appointments';
import { clientsApi } from '$lib/api/clients';
import { staffApi } from '$lib/api/staff';
import { servicesApi } from '$lib/api/services';
import { fail } from '@sveltejs/kit';

function err(e: unknown) {
  const anyE = e as any;
  if (typeof anyE?.data === 'string') return anyE.data;
  return anyE?.data?.message || anyE?.message || 'Error';
}

export const load: PageServerLoad = async ({ fetch }) => {
  const [appointments, clients, staff, services] = await Promise.all([
    appointmentsApi.list(fetch).catch(() => ({ data: [] })),
    clientsApi.list(fetch).catch(() => ({ data: [] })),
    staffApi.list({ per_page: 200 }, fetch).catch(() => ({ data: [] })),
    servicesApi.list(fetch).catch(() => ({ data: [] }))
  ]);
  return {
    appointments: (appointments as any).data || [],
    clients: (clients as any).data || [],
    staff: (staff as any).data || [],
    services: (services as any).data || []
  };
};

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const form = await request.formData();
    const client_id = String(form.get('client_id') || '').trim();
    const staff_id = String(form.get('staff_id') || '').trim();
    const service_id = String(form.get('service_id') || '').trim();
    const start = String(form.get('start') || '').trim();
    const end = String(form.get('end') || '').trim();
    if (!client_id || !staff_id || !service_id || !start || !end) {
      return fail(400, { error: 'Todos los campos son requeridos' });
    }
    try {
      await appointmentsApi.create({ client_id, staff_id, service_id, start, end }, fetch);
      return { success: true };
    } catch (e: unknown) {
      return fail((e as any)?.status || 400, { error: err(e) });
    }
  },
  delete: async ({ request, fetch }) => {
    const form = await request.formData();
    const id = String(form.get('id') || '').trim();
    if (!id) return fail(400, { error: 'ID requerido' });
    try {
      await appointmentsApi.remove(id, fetch);
      return { success: true };
    } catch (e: unknown) {
      return fail((e as any)?.status || 400, { error: err(e) });
    }
  }
};
