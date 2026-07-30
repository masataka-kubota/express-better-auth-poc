import { describe, expect, it } from 'vitest';

import { loginFormSchema } from './index';

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
