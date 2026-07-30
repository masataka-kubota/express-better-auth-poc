import { describe, expect, it } from 'vitest';

import { emailSchema, passwordSchema } from '@/lib/schemas/common';

describe('emailSchema', () => {
  it('accepts a valid email', () => {
    const result = emailSchema.safeParse('admin@example.com');
    expect(result.success).toBe(true);
  });

  it('rejects an empty string', () => {
    const result = emailSchema.safeParse('');
    expect(result.success).toBe(false);
  });

  it('rejects a string without @', () => {
    const result = emailSchema.safeParse('invalidemail');
    expect(result.success).toBe(false);
  });

  it('rejects a string with spaces', () => {
    const result = emailSchema.safeParse('has space@example.com');
    expect(result.success).toBe(false);
  });
});

describe('passwordSchema', () => {
  it('accepts a non-empty password', () => {
    const result = passwordSchema.safeParse('password123');
    expect(result.success).toBe(true);
  });

  it('rejects an empty string', () => {
    const result = passwordSchema.safeParse('');
    expect(result.success).toBe(false);
  });
});
