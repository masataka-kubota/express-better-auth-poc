import type { BetterFetchError } from '@better-fetch/fetch';
import { notifications } from '@mantine/notifications';
import { createAuthClient } from 'better-auth/react';

import { env } from '@/lib/env';

/**
 * Convert an auth error payload into a user-facing message for the UI.
 *
 * @param error - A Better Fetch / Better Auth error payload such as { message } or { status, message }.
 * @returns A user-facing message suitable for form or notification UI.
 */
export const getAuthErrorMessage = (error: BetterFetchError): string => {
  const nested =
    error.error && typeof error.error === 'object' && typeof error.error.message === 'string'
      ? error.error.message
      : undefined;
  const message = nested ?? error.message;

  if (error.status === 400 || error.status === 422) {
    return message || 'The request could not be processed.';
  }
  if (error.status === 401 || error.status === 403) {
    return message || 'Your session is no longer valid. Please sign in again.';
  }
  if (error.status === 429) {
    return message || 'Too many requests. Please wait a moment and try again.';
  }
  if (error.status >= 500) {
    return 'The server is experiencing a temporary issue. Please try again shortly.';
  }
  return message || 'Something went wrong. Please try again.';
};

export const authClient = createAuthClient({
  baseURL: `${env.backendBaseUrl}`,
  fetchOptions: {
    credentials: 'include',
    onError: (ctx) => {
      const status = ctx.response?.status;
      if (!ctx.response) {
        notifications.show({
          title: 'Network Error',
          message: 'Please check your connection or confirm that the server is running.',
          color: 'red',
        });
        return;
      } else if (status && status >= 500) {
        notifications.show({
          title: 'Server Error',
          message: 'The server is experiencing a temporary issue. Please try again shortly.',
          color: 'red',
        });
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
