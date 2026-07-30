import { z } from 'zod';

/**
 * Validates an email address using a simple pattern.
 */
export const emailSchema = z.string().min(1, 'Email is required').email('Enter a valid email');

/**
 * Validates a password field.
 */
export const passwordSchema = z.string().min(1, 'Password is required');
