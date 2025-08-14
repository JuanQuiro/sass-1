import { bff } from './client';
import type { AuthResponse } from '$lib/types/entities';

export interface LoginInput { email?: string; username?: string; password: string }
export interface RegisterInput { name?: string; email?: string; username?: string; password: string }

export const authApi = {
  login: (body: LoginInput, fetchFn?: typeof fetch) => bff.post<AuthResponse, LoginInput>('/api/auth/login', body, fetchFn),
  register: (body: RegisterInput, fetchFn?: typeof fetch) => bff.post<AuthResponse, RegisterInput>('/api/auth/register', body, fetchFn),
  mePermissions: (fetchFn?: typeof fetch) => bff.get<string[]>('/api/me/permissions', undefined, fetchFn)
};
