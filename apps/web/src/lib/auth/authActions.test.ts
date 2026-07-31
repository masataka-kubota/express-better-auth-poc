import { beforeEach, describe, expect, it, vi } from 'vitest';

import { signIn, signOut } from '@/lib/auth/authActions';
import { getAuthErrorMessage } from '@/lib/auth/authErrors';

const { mockSignInEmail, mockSignOut } = vi.hoisted(() => ({
  mockSignInEmail: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock('@/lib/auth/authClient', () => ({
  authClient: {
    signIn: {
      email: mockSignInEmail,
    },
    signOut: mockSignOut,
  },
}));

vi.mock('@/lib/auth/authErrors', () => ({
  getAuthErrorMessage: vi.fn(),
}));

describe('auth actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getAuthErrorMessage).mockReturnValue('Mapped auth error');
  });

  it('signIn throws a mapped error when Better Auth returns an error', async () => {
    const authError = { message: 'Invalid credentials' };
    mockSignInEmail.mockResolvedValue({ error: authError });

    await expect(signIn({ email: 'user@example.com', password: 'password' })).rejects.toThrow(
      'Mapped auth error',
    );
    expect(getAuthErrorMessage).toHaveBeenCalledWith(authError);
  });

  it('signOut throws a mapped error when Better Auth returns an error', async () => {
    const authError = { message: 'Sign out failed' };
    mockSignOut.mockResolvedValue({ error: authError });

    await expect(signOut()).rejects.toThrow('Mapped auth error');
    expect(getAuthErrorMessage).toHaveBeenCalledWith(authError);
  });

  it('signIn resolves when Better Auth succeeds', async () => {
    mockSignInEmail.mockResolvedValue({ error: null });

    await expect(
      signIn({ email: 'user@example.com', password: 'password' }),
    ).resolves.toBeUndefined();
    expect(mockSignInEmail).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password',
    });
  });

  it('signOut resolves when Better Auth succeeds', async () => {
    mockSignOut.mockResolvedValue({ error: null });

    await expect(signOut()).resolves.toBeUndefined();
    expect(mockSignOut).toHaveBeenCalled();
  });
});
