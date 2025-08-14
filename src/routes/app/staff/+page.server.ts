import type { Actions, PageServerLoad } from './$types';
import { staffApi } from '$lib/api/staff';
import { fail } from '@sveltejs/kit';
import { salonsApi } from '$lib/api/salons';

function errorDetail(e: unknown): string | undefined {
  const anyE = e as any;
  if (typeof anyE?.data === 'string') return anyE.data;
  if (anyE?.data?.message) return String(anyE.data.message);
  if (anyE?.message) return String(anyE.message);
  return undefined;
}

export const load: PageServerLoad = async ({ fetch, url }) => {
  const page = Number(url.searchParams.get('page') || '1') || 1;
  const per_page = Number(url.searchParams.get('per_page') || '20') || 20;
  const q = url.searchParams.get('q') || undefined;
  const [staff, salons] = await Promise.all([
    staffApi.list({ page, per_page, q }, fetch).catch((e: unknown) => ({ data: [], error: errorDetail(e), status: (e as any)?.status })),
    salonsApi.list({ per_page: 100 }, fetch).catch(() => ({ data: [] as any[] }))
  ]);
  return { staff: (staff as any).data, salons: (salons as any).data, page, per_page, q, error: (staff as any).error, status: (staff as any).status };
};

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const skills = String(form.get('skills') || '').trim();
    const salon_id_raw = String(form.get('salon_id') || '').trim();
    const active = String(form.get('active') || '') === 'on' ? true : String(form.get('active') || '') === 'true';
    if (!name) return fail(400, { error: 'Nombre requerido' });
    if (!skills) return fail(400, { error: 'Skills requeridos' });
    if (!salon_id_raw) return fail(400, { error: 'Salon requerido' });
    const salon_id = /^[0-9]+$/.test(salon_id_raw) ? Number(salon_id_raw) : salon_id_raw;
    try {
      await staffApi.create({ name, skills, salon_id, active: Boolean(active) }, fetch);
      return { success: true };
    } catch (e: unknown) {
      const detail = errorDetail(e);
      return fail((e as any)?.status || 400, { error: detail || 'No se pudo crear' });
    }
  },
  update: async ({ request, fetch }) => {
    const form = await request.formData();
    const id = String(form.get('id') || '').trim();
    const name = String(form.get('name') || '').trim();
    const skills = String(form.get('skills') || '').trim();
    const active = String(form.get('active') || '') === 'on' ? true : String(form.get('active') || '') === 'true';
    if (!id) return fail(400, { error: 'ID requerido' });
    if (!name) return fail(400, { error: 'Nombre requerido' });
    if (!skills) return fail(400, { error: 'Skills requeridos' });
    try {
      await staffApi.update(id, { name, skills, active: Boolean(active) }, fetch);
      return { success: true };
    } catch (e: unknown) {
      const detail = errorDetail(e);
      return fail((e as any)?.status || 400, { error: detail || 'No se pudo actualizar' });
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
