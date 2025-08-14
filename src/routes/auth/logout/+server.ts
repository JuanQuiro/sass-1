import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, url }) => {
  cookies.delete('session', { path: '/' });
  throw redirect(302, '/auth/login');
};
