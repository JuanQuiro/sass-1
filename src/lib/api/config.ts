export const BACKEND_BASE = 'http://173.249.205.142:8080';

// Allowed paths we will proxy via the BFF for safety
export const ALLOWED_API_PATHS = new Set([
  '/health',
  '/auth/login',
  '/auth/register',
  '/me/permissions',
  '/users',
  '/salons',
  '/clients',
  '/services',
  '/staff',
  '/service-staff',
  '/appointments'
]);
