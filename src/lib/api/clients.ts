import { bff } from './client';
import type { Client } from '$lib/types/entities';

export const clientsApi = {
  list: (fetchFn?: typeof fetch) => bff.get<Client[]>('/api/clients', undefined, fetchFn),
  create: (body: Client, fetchFn?: typeof fetch) => bff.post<Client, Client>('/api/clients', body, fetchFn)
};
