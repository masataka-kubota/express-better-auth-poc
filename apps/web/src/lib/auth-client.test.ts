import { describe, expect, it, vi } from 'vitest';

import { authClient } from '@/lib/auth-client';

const { mockGetSession } = vi.hoisted(() => ({
  mockGetSession: vi.fn(),
}));

vi.mock('@/lib/env', () => ({
  env: {
    backendBaseUrl: 'http://localhost:3000',
  },
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

describe('auth client setup', () => {
  it('creates the auth client without throwing', async () => {
    expect(authClient).toBeDefined();
  });
});
