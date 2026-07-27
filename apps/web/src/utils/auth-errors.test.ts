import { BetterFetchError } from '@better-fetch/fetch';
import { describe, expect, it } from 'vitest';

import { getAuthErrorMessage } from '@/utils/auth-errors';

describe('getAuthErrorMessage', () => {
  it('maps an auth error with a status code to a friendly message', () => {
    const errorMessage = 'Invalid credentials';
    expect(
      getAuthErrorMessage(new BetterFetchError(401, 'Unauthorized', { message: errorMessage })),
    ).toBe(errorMessage);
  });

  it('returns the message from a Better Auth error payload', () => {
    const errorMessage = 'Invalid email or password';
    expect(
      getAuthErrorMessage(new BetterFetchError(400, 'Bad Request', { message: errorMessage })),
    ).toBe(errorMessage);
  });

  it('falls back to a status-specific message when no message is available', () => {
    const fallbackMessage = 'Your session is no longer valid. Please sign in again.';
    expect(getAuthErrorMessage(new BetterFetchError(401, 'Unauthorized', { message: '' }))).toBe(
      fallbackMessage,
    );
  });
});
