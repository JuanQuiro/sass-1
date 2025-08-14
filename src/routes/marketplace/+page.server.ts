import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch, url }) => {
  const token = cookies.get('session');
  if (!token) {
    const redirectTo = encodeURIComponent(url.pathname + url.search);
    throw redirect(302, `/auth/login?redirectTo=${redirectTo}`);
  }

  try {
    const res = await fetch('/api/salons');
    if (!res.ok) {
      if (res.status === 401) {
        throw redirect(302, `/auth/login?redirectTo=${encodeURIComponent(url.pathname)}`);
      }
      return { salons: [] };
    }
    const data = await res.json();
    const salons = Array.isArray(data) ? data : data?.data || [];
    return { salons };
  } catch {
    return { salons: [] };
  }
};
