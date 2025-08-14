import { bff } from './client';
import type { Service } from '$lib/types/entities';

export const servicesApi = {
  list: (fetchFn?: typeof fetch) => bff.get<Service[]>('/api/services', undefined, fetchFn),
  create: (body: Service, fetchFn?: typeof fetch) => bff.post<Service, Service>('/api/services', body, fetchFn)
};
