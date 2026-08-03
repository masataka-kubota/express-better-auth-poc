import type { BetterFetchError } from 'better-auth/react';

import { authClient } from '@/lib/auth/authClient';
import { getAuthErrorMessage } from '@/lib/auth/authErrors';
import type { LoginFormValues, SignupFormValues } from '@/lib/schemas';

/**
 * Sign in with email and password.
 *
 * @param values - The login form values (email and password).
 * @throws If the sign in request fails.
 */
export const signIn = async (values: LoginFormValues): Promise<void> => {
  const { error } = await authClient.signIn.email(values);
  if (error) {
    throw new Error(getAuthErrorMessage(error as BetterFetchError));
  }
};

/**
 * Sign up with email and password.
 *
 * @param values - The signup form values (name, email, password).
 * @throws If the sign up request fails.
 */
export const signUp = async (values: SignupFormValues): Promise<void> => {
  const { error } = await authClient.signUp.email({
    ...values,
    callbackURL: `${window.location.origin}/login`,
  });
  if (error) {
    throw new Error(getAuthErrorMessage(error as BetterFetchError));
  }
};

/**
 * Send a password reset email.
 *
 * @param email - The user's email address.
 * @throws If the request fails.
 */
export const forgotPassword = async (email: string): Promise<void> => {
  const { error } = await authClient.requestPasswordReset({
    email,
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) {
    throw new Error(getAuthErrorMessage(error as BetterFetchError));
  }
};

/**
 * Reset a password using a token.
 *
 * @param values - The reset password form values.
 * @throws If the request fails.
 */
export const resetPassword = async (values: { token: string; newPassword: string }) => {
  const { error } = await authClient.resetPassword({
    token: values.token,
    newPassword: values.newPassword,
  });
  if (error) {
    throw new Error(getAuthErrorMessage(error as BetterFetchError));
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
    throw new Error(getAuthErrorMessage(error as BetterFetchError));
  }
};
