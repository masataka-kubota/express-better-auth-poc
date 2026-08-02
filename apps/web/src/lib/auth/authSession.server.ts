import { getRequestHeaders } from '@tanstack/react-start/server';

import { env } from '@/lib/env';

/**
 * The authenticated user resolved from the current server session.
 */
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
}

interface ServerSessionPayload {
  user?: SessionUser | null;
}

/**
 * Resolve the current user's session from the incoming server request.
 *
 * This is the server-only implementation used by the SSR guard.
 *
 * @returns The authenticated user, or `null` when there is no valid session.
 */
export const verifyServerSession = async (): Promise<SessionUser | null> => {
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
      return null;
    }

    const data = (await response.json()) as ServerSessionPayload | null;
    return data?.user ?? null;
  } catch {
    return null;
  }
};
