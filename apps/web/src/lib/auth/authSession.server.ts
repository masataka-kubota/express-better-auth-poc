import { getRequestHeaders } from '@tanstack/react-start/server';

import { env } from '@/lib/env';

interface ServerSessionPayload {
  user?: Record<string, unknown> | null;
}

/**
 * Resolve the current user's session from the incoming server request.
 *
 * This is the server-only implementation used by the SSR guard.
 */
export const verifyServerSession = async (): Promise<boolean> => {
  try {
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
  } catch {
    return false;
  }
};
