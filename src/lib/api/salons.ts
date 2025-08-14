import { bff } from './client';
import type { Salon } from '$lib/types/entities';

export const salonsApi = {
  list: (
    query?: { page?: number; per_page?: number; q?: string },
    fetchFn?: typeof fetch
  ) => bff.get<Salon[]>('/api/salons', query, fetchFn),
  create: (body: Salon & { address: any }, fetchFn?: typeof fetch) => bff.post<Salon, Salon>('/api/salons', body, fetchFn),
  update: (id: string | number, body: Partial<Salon> & { address?: any }, fetchFn?: typeof fetch) =>
    bff.put<Salon, Partial<Salon>>(`/api/salons/${id}`, body, fetchFn),
  remove: (id: string | number, fetchFn?: typeof fetch) => bff.del<{ success: boolean }>(`/api/salons/${id}`, fetchFn)
};
