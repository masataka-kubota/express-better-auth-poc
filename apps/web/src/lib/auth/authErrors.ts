import type { BetterFetchError } from 'better-auth/react';

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
