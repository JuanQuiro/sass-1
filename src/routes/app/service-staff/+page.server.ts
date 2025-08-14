import type { Actions, PageServerLoad } from './$types';
import { serviceStaffApi } from '$lib/api/serviceStaff';
import { servicesApi } from '$lib/api/services';
import { staffApi } from '$lib/api/staff';
import { fail } from '@sveltejs/kit';

function err(e: unknown) {
  const anyE = e as any;
  if (typeof anyE?.data === 'string') return anyE.data;
  return anyE?.data?.message || anyE?.message || 'Error';
}

export const load: PageServerLoad = async ({ fetch }) => {
  const [assignments, services, staff] = await Promise.all([
    serviceStaffApi.list(fetch).catch(() => ({ data: [] })),
    servicesApi.list(fetch).catch(() => ({ data: [] })),
    staffApi.list({ per_page: 200 }, fetch).catch(() => ({ data: [] }))
  ]);
  return { assignments: (assignments as any).data || [], services: (services as any).data || [], staff: (staff as any).data || [] };
};

export const actions: Actions = {
  assign: async ({ request, fetch }) => {
    const form = await request.formData();
    const service_id = String(form.get('service_id') || '').trim();
    const staff_id = String(form.get('staff_id') || '').trim();
    if (!service_id || !staff_id) return fail(400, { error: 'Servicio y Staff requeridos' });
    try {
      await serviceStaffApi.assign({ service_id, staff_id }, fetch);
      return { success: true };
    } catch (e: unknown) {
      return fail((e as any)?.status || 400, { error: err(e) });
    }
  },
  unassign: async ({ request, fetch }) => {
    const form = await request.formData();
    const service_id = String(form.get('service_id') || '').trim();
    const staff_id = String(form.get('staff_id') || '').trim();
    if (!service_id || !staff_id) return fail(400, { error: 'Servicio y Staff requeridos' });
    try {
      await serviceStaffApi.unassign(service_id, staff_id, fetch);
      return { success: true };
    } catch (e: unknown) {
      return fail((e as any)?.status || 400, { error: err(e) });
    }
  }
};
