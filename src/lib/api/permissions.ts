import { bff } from './client';

export const permissionsApi = {
  me: (fetchFn?: typeof fetch) => bff.get<string[]>('/api/me/permissions', undefined, fetchFn),
  getUser: (id: string | number, fetchFn?: typeof fetch) => bff.get<string[]>(`/api/users/${id}/permissions`, undefined, fetchFn),
  setUser: (id: string | number, perms: string[], fetchFn?: typeof fetch) => bff.post<{ success: boolean }, { permissions: string[] }>(`/api/users/${id}/permissions`, { permissions: perms }, fetchFn),
  revoke: (id: string | number, perm: string, fetchFn?: typeof fetch) => bff.del<{ success: boolean }>(`/api/users/${id}/permissions/${encodeURIComponent(perm)}`, fetchFn)
};
