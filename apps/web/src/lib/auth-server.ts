import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { env } from '@/lib/env';

interface ServerSessionPayload {
  user?: Record<string, unknown> | null;
}

type RequestHeaders = Pick<ReturnType<typeof getRequestHeaders>, 'get'>;

/**
 * Resolve the current user's session on the server side using the incoming request headers.
 *
 * Exported separately so it can be tested without the `createServerFn` wrapper.
 */
export const resolveServerSession = async (headers: RequestHeaders): Promise<boolean> => {
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
};

/**
 * Server function used by SSR route guards.
 */
export const getServerSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders();
  return resolveServerSession(headers);
});
