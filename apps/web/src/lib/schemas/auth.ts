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
 * Infer the shape of the login form values from {@link loginFormSchema}.
 */
export type LoginFormValues = z.infer<typeof loginFormSchema>;
