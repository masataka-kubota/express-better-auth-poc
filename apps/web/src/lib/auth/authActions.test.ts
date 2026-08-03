// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { forgotPassword, resetPassword, signIn, signOut, signUp } from '@/lib/auth/authActions';
import { getAuthErrorMessage } from '@/lib/auth/authErrors';

const {
  mockSignInEmail,
  mockSignUpEmail,
  mockSignOut,
  mockRequestPasswordReset,
  mockResetPassword,
} = vi.hoisted(() => ({
  mockSignInEmail: vi.fn(),
  mockSignUpEmail: vi.fn(),
  mockSignOut: vi.fn(),
  mockRequestPasswordReset: vi.fn(),
  mockResetPassword: vi.fn(),
}));

vi.mock('@/lib/auth/authClient', () => ({
  authClient: {
    signIn: {
      email: mockSignInEmail,
    },
    signUp: {
      email: mockSignUpEmail,
    },
    signOut: mockSignOut,
    requestPasswordReset: mockRequestPasswordReset,
    resetPassword: mockResetPassword,
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

  it('signUp passes values and a login callback URL', async () => {
    mockSignUpEmail.mockResolvedValue({ error: null });

    await expect(
      signUp({ name: 'Test User', email: 'user@example.com', password: 'password' }),
    ).resolves.toBeUndefined();
    expect(mockSignUpEmail).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password',
      callbackURL: `${window.location.origin}/login`,
    });
  });

  it('signUp throws a mapped error when Better Auth returns an error', async () => {
    const authError = { message: 'Sign up failed' };
    mockSignUpEmail.mockResolvedValue({ error: authError });

    await expect(
      signUp({ name: 'Test User', email: 'user@example.com', password: 'password' }),
    ).rejects.toThrow('Mapped auth error');
    expect(getAuthErrorMessage).toHaveBeenCalledWith(authError);
  });

  it('forgotPassword requests a reset with a reset-password redirect', async () => {
    mockRequestPasswordReset.mockResolvedValue({ error: null });

    await expect(forgotPassword('user@example.com')).resolves.toBeUndefined();
    expect(mockRequestPasswordReset).toHaveBeenCalledWith({
      email: 'user@example.com',
      redirectTo: `${window.location.origin}/reset-password`,
    });
  });

  it('forgotPassword throws a mapped error when Better Auth returns an error', async () => {
    const authError = { message: 'Reset request failed' };
    mockRequestPasswordReset.mockResolvedValue({ error: authError });

    await expect(forgotPassword('user@example.com')).rejects.toThrow('Mapped auth error');
    expect(getAuthErrorMessage).toHaveBeenCalledWith(authError);
  });

  it('resetPassword passes the token and new password', async () => {
    mockResetPassword.mockResolvedValue({ error: null });

    await expect(
      resetPassword({ token: 'reset-token', newPassword: 'new-password' }),
    ).resolves.toBeUndefined();
    expect(mockResetPassword).toHaveBeenCalledWith({
      token: 'reset-token',
      newPassword: 'new-password',
    });
  });

  it('resetPassword throws a mapped error when Better Auth returns an error', async () => {
    const authError = { message: 'Reset failed' };
    mockResetPassword.mockResolvedValue({ error: authError });

    await expect(
      resetPassword({ token: 'reset-token', newPassword: 'new-password' }),
    ).rejects.toThrow('Mapped auth error');
    expect(getAuthErrorMessage).toHaveBeenCalledWith(authError);
  });
});
