import { bff } from './client';
import type { ServiceStaff } from '$lib/types/entities';

export const serviceStaffApi = {
  list: (fetchFn?: typeof fetch) => bff.get<ServiceStaff[]>('/api/service-staff', undefined, fetchFn),
  assign: (body: ServiceStaff, fetchFn?: typeof fetch) => bff.post<ServiceStaff, ServiceStaff>('/api/service-staff', body, fetchFn),
  unassign: (service_id: string | number, staff_id: string | number, fetchFn?: typeof fetch) => bff.del<{ success: boolean }>(`/api/service-staff/${service_id}/${staff_id}`, fetchFn)
};
