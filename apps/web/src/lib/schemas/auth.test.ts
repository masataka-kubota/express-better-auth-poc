import { describe, expect, it } from 'vitest';

import {
  forgotPasswordFormSchema,
  loginFormSchema,
  resetPasswordFormSchema,
  signupFormSchema,
} from './index';

describe('loginFormSchema', () => {
  it('accepts valid email and password', () => {
    const result = loginFormSchema.safeParse({
      email: 'admin@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = loginFormSchema.safeParse({
      email: 'invalid',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an empty password', () => {
    const result = loginFormSchema.safeParse({
      email: 'admin@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing fields', () => {
    const result = loginFormSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('signupFormSchema', () => {
  const validValues = {
    name: 'Test User',
    email: 'admin@example.com',
    password: 'password123',
  };

  it('accepts valid name, email and password', () => {
    const result = signupFormSchema.safeParse(validValues);
    expect(result.success).toBe(true);
  });

  it('rejects an empty name', () => {
    const result = signupFormSchema.safeParse({ ...validValues, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing fields', () => {
    const result = signupFormSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('forgotPasswordFormSchema', () => {
  it('accepts a valid email', () => {
    const result = forgotPasswordFormSchema.safeParse({ email: 'admin@example.com' });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = forgotPasswordFormSchema.safeParse({ email: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('rejects an empty email', () => {
    const result = forgotPasswordFormSchema.safeParse({ email: '' });
    expect(result.success).toBe(false);
  });
});

describe('resetPasswordFormSchema', () => {
  it('accepts a non-empty new password', () => {
    const result = resetPasswordFormSchema.safeParse({ newPassword: 'password123' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty new password', () => {
    const result = resetPasswordFormSchema.safeParse({ newPassword: '' });
    expect(result.success).toBe(false);
  });
});
