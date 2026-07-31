import { authClient } from '@/lib/auth/authClient';
import type { LoginFormValues } from '@/lib/schemas';

/**
 * Sign in with email and password.
 *
 * @param values - The login form values (email and password).
 * @throws If the sign in request fails.
 */
export const signIn = async (values: LoginFormValues): Promise<void> => {
  const { error } = await authClient.signIn.email(values);
  if (error) {
    throw new Error(error.message || 'Failed to sign in.');
  }
};

/**
 * Sign out the current session.
 *
 * @throws If the sign out request fails.
 */
export const signOut = async (): Promise<void> => {
  const { error } = await authClient.signOut();
  if (error) {
    throw new Error(error.message || 'Failed to sign out.');
  }
};
