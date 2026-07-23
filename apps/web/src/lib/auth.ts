import { createServerFn } from '@tanstack/react-start';
import { deleteCookie, getCookie, setCookie } from '@tanstack/react-start/server';

// TODO: Replace with real Better Auth session validation once backend integration is complete.
// Currently uses a trivial cookie check — not safe for any deployment.
export const SESSION_COOKIE = 'poc_admin_session';

export const DEMO_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password',
} as const;

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  return getCookie(SESSION_COOKIE) === '1';
});

export const login = createServerFn({ method: 'POST' })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
      setCookie(SESSION_COOKIE, '1', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
      return { ok: true as const };
    }

    return { ok: false as const, error: 'Invalid email or password' };
  });

export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  deleteCookie(SESSION_COOKIE, { path: '/' });
  return { ok: true as const };
});
