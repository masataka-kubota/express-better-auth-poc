import { describe, expect, it } from 'vitest';

import { getAuthErrorMessage } from '@/lib/auth/authErrors';

/**
 * Create a minimal error-like object compatible with getAuthErrorMessage.
 *
 * @param status - HTTP status code to simulate.
 * @param message - Error message to expose to the mapper.
 * @returns An object shaped like the auth error payload expected by the mapper.
 */
const createError = (status: number, message: string) =>
  ({
    status,
    statusText: '',
    error: undefined,
    name: 'Error',
    message,
  }) as Parameters<typeof getAuthErrorMessage>[0];

describe('getAuthErrorMessage', () => {
  it.each([
    [401, 'Invalid credentials'],
    [400, 'Invalid email or password'],
  ])('returns the message for status %s', (status, errorMessage) => {
    expect(getAuthErrorMessage(createError(status, errorMessage))).toBe(errorMessage);
  });

  it('falls back to a status-specific message when no message is available', () => {
    const fallbackMessage = 'Your session is no longer valid. Please sign in again.';
    expect(getAuthErrorMessage(createError(401, ''))).toBe(fallbackMessage);
  });
});
