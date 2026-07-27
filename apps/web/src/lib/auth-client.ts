import { createAuthClient } from 'better-auth/react';

import { env } from '@/lib/env';
import { showErrorNotification } from '@/lib/notify';

export const authClient = createAuthClient({
  baseURL: env.backendBaseUrl,
  fetchOptions: {
    credentials: 'include',
    onError: (ctx) => {
      if (typeof window === 'undefined') {
        return;
      }

      const status = ctx.response?.status;
      if (!ctx.response) {
        showErrorNotification(
          'Network Error',
          'Please check your connection or confirm that the server is running.',
        );
        return;
      } else if (status && status >= 500) {
        showErrorNotification(
          'Server Error',
          'The server is experiencing a temporary issue. Please try again shortly.',
        );
      }
    },
  },
});

/**
 * Check whether the current user has a valid session.
 * Returns false for network or session lookup failures so the caller can continue safely.
 *
 * @returns True when a session with a user exists, otherwise false.
 */
export const hasValidSession = async () => {
  try {
    const { data, error } = await authClient.getSession();

    if (error) {
      return false;
    }

    return Boolean(data?.user);
  } catch {
    return false;
  }
};
