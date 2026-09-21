import { createNeonAuth } from '@neondatabase/auth/next/server';
export function authConfigured() {
  return Boolean(process.env.NEON_AUTH_BASE_URL && process.env.NEON_AUTH_COOKIE_SECRET);
}
export function getAuth() {
  if (!authConfigured()) throw new Error('Authentication is not configured');
  return createNeonAuth({baseUrl: process.env.NEON_AUTH_BASE_URL!, cookies: {secret: process.env.NEON_AUTH_COOKIE_SECRET!}});
}
