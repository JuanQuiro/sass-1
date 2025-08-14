import { bff } from './client';
import type { Staff } from '$lib/types/entities';

export const staffApi = {
  list: (
    query?: { page?: number; per_page?: number; q?: string },
    fetchFn?: typeof fetch
  ) => bff.get<Staff[]>('/api/staff', query, fetchFn),
  create: (
    body: { name: string; salon_id: number | string; skills: string; active: boolean },
    fetchFn?: typeof fetch
  ) => bff.post<Staff, typeof body>('/api/staff', body, fetchFn),
  update: (
    id: string | number,
    body: { name?: string; skills?: string; active?: boolean },
    fetchFn?: typeof fetch
  ) => bff.put<Staff, typeof body>(`/api/staff/${id}`, body, fetchFn),
  remove: (id: string | number, fetchFn?: typeof fetch) => bff.del<{ success: boolean }>(`/api/staff/${id}`, fetchFn)
};
