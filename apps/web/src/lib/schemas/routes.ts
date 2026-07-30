import { z } from 'zod';

/**
 * Validates the `redirect` search parameter for the login route.
 * Only allows internal paths (starting with `/` but not `//`).
 * External URLs and protocol-relative URLs are sanitized to undefined to prevent open redirects.
 */
export const redirectSchema = z
  .string()
  .optional()
  .transform((val) => {
    if (!val) {
      return undefined;
    }
    if (val.startsWith('//')) {
      return undefined;
    }
    return val.startsWith('/') ? val : undefined;
  });

/**
 * Schema for the login route search parameters.
 */
export const loginSearchSchema = z.object({
  redirect: redirectSchema,
});

/**
 * Infer the shape of the login route search parameters from {@link loginSearchSchema}.
 */
export type LoginSearchValues = z.infer<typeof loginSearchSchema>;
