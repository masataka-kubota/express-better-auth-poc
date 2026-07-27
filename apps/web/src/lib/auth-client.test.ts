import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockGetSession } = vi.hoisted(() => ({
  mockGetSession: vi.fn(),
}));

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}));

vi.mock('better-auth/react', () => ({
  createAuthClient: () => ({
    getSession: mockGetSession,
  }),
}));

import { hasValidSession } from './auth-client';

describe('hasValidSession', () => {
  beforeEach(() => {
    mockGetSession.mockReset();
  });

  it('returns true when the session contains a user', async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { user: { id: '1' } },
      error: null,
    });

    await expect(hasValidSession()).resolves.toBe(true);
  });

  it('returns false when getSession throws', async () => {
    mockGetSession.mockRejectedValueOnce(new Error('network'));

    await expect(hasValidSession()).resolves.toBe(false);
  });
});
