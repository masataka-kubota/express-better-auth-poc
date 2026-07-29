import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { env } from '@/lib/env';

interface ServerSessionPayload {
  user?: Record<string, unknown> | null;
}

/**
 * Resolve the current user's session on the server side using the incoming request headers.
 *
 * This is used by SSR route guards so protected pages can reject unauthenticated users
 * before rendering the page content.
 */
export const getServerSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders();
  const cookie = headers.get('cookie') ?? '';

  const response = await fetch(`${env.backendBaseUrl}/api/auth/get-session`, {
    credentials: 'include',
    headers: {
      accept: 'application/json',
      cookie,
    },
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as ServerSessionPayload | null;
  return Boolean(data?.user);
});
