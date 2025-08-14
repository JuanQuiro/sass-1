import { bff } from './client';
import type { Staff } from '$lib/types/entities';

export const staffApi = {
  list: (fetchFn?: typeof fetch) => bff.get<Staff[]>('/api/staff', undefined, fetchFn),
  create: (body: Staff, fetchFn?: typeof fetch) => bff.post<Staff, Staff>('/api/staff', body, fetchFn),
  update: (id: string | number, body: Partial<Staff>, fetchFn?: typeof fetch) => bff.put<Staff, Partial<Staff>>(`/api/staff/${id}`, body, fetchFn),
  remove: (id: string | number, fetchFn?: typeof fetch) => bff.del<{ success: boolean }>(`/api/staff/${id}`, fetchFn)
};
