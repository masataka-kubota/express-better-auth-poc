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
    [400, 'Invalid email or password'],
    [401, 'Invalid credentials'],
  ])('returns the message for status %s', (status, errorMessage) => {
    expect(getAuthErrorMessage(createError(status, errorMessage))).toBe(errorMessage);
  });

  it('prefers a nested error message for 400 responses', () => {
    const error = {
      ...createError(400, 'Outer message'),
      error: { message: 'Nested validation error' },
    };

    expect(getAuthErrorMessage(error)).toBe('Nested validation error');
  });

  it('falls back to a generic request message for 400 and 422 when no message is available', () => {
    expect(getAuthErrorMessage(createError(400, ''))).toBe('The request could not be processed.');
    expect(getAuthErrorMessage(createError(422, ''))).toBe('The request could not be processed.');
  });

  it('falls back to a session expired message for 401 and 403 when no message is available', () => {
    const fallbackMessage = 'Your session is no longer valid. Please sign in again.';
    expect(getAuthErrorMessage(createError(401, ''))).toBe(fallbackMessage);
    expect(getAuthErrorMessage(createError(403, ''))).toBe(fallbackMessage);
  });

  it('falls back to a rate-limit message for 429 when no message is available', () => {
    const fallbackMessage = 'Too many requests. Please wait a moment and try again.';
    expect(getAuthErrorMessage(createError(429, ''))).toBe(fallbackMessage);
  });

  it('returns a temporary server issue message for 500 regardless of the payload message', () => {
    expect(getAuthErrorMessage(createError(500, 'Database unavailable'))).toBe(
      'The server is experiencing a temporary issue. Please try again shortly.',
    );
  });

  it('falls back to a generic message for other statuses when no message is available', () => {
    const fallbackMessage = 'Something went wrong. Please try again.';
    expect(getAuthErrorMessage(createError(404, ''))).toBe(fallbackMessage);
  });
});
