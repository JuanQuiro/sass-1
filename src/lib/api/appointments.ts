import { bff } from './client';
import type { Appointment } from '$lib/types/entities';

export const appointmentsApi = {
  list: (fetchFn?: typeof fetch) => bff.get<Appointment[]>('/api/appointments', undefined, fetchFn),
  create: (body: Appointment, fetchFn?: typeof fetch) => bff.post<Appointment, Appointment>('/api/appointments', body, fetchFn),
  get: (id: string | number, fetchFn?: typeof fetch) => bff.get<Appointment>(`/api/appointments/${id}`, undefined, fetchFn),
  update: (id: string | number, body: Partial<Appointment>, fetchFn?: typeof fetch) => bff.put<Appointment, Partial<Appointment>>(`/api/appointments/${id}`, body, fetchFn),
  remove: (id: string | number, fetchFn?: typeof fetch) => bff.del<{ success: boolean }>(`/api/appointments/${id}`, fetchFn),
  staffAvailability: (staff_id: string | number, fetchFn?: typeof fetch) => bff.get<any>(`/api/staff/${staff_id}/availability`, undefined, fetchFn)
};
