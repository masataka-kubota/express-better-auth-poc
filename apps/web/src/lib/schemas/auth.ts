import { z } from 'zod';

import { emailSchema, passwordSchema } from './common';

/**
 * Schema for the login form fields.
 */
export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Schema for the signup form fields.
 */
export const signupFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Schema for the forgot password form.
 */
export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

/**
 * Schema for the reset password form.
 */
export const resetPasswordFormSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Infer the shape of the login form values from {@link loginFormSchema}.
 */
export type LoginFormValues = z.infer<typeof loginFormSchema>;

/**
 * Infer the shape of the signup form values from {@link signupFormSchema}.
 */
export type SignupFormValues = z.infer<typeof signupFormSchema>;

/**
 * Infer the shape of the forgot password form values from {@link forgotPasswordFormSchema}.
 */
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

/**
 * Infer the shape of the reset password form values from {@link resetPasswordFormSchema}.
 */
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
