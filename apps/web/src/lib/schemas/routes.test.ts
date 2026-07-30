import { describe, expect, it } from 'vitest';

import { loginSearchSchema, redirectSchema } from './index';

describe('redirectSchema', () => {
  it('returns undefined for an empty value', () => {
    const result = redirectSchema.safeParse('');
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });

  it('returns undefined for undefined', () => {
    const result = redirectSchema.safeParse(undefined);
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });

  it('returns the value for a valid internal path', () => {
    const result = redirectSchema.safeParse('/dashboard');
    expect(result.success).toBe(true);
    expect(result.data).toBe('/dashboard');
  });

  it('returns the value for a nested internal path', () => {
    const result = redirectSchema.safeParse('/users/123');
    expect(result.success).toBe(true);
    expect(result.data).toBe('/users/123');
  });

  it('returns undefined for a protocol-relative URL', () => {
    const result = redirectSchema.safeParse('//evil.com');
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });

  it('returns undefined for an external URL', () => {
    const result = redirectSchema.safeParse('https://evil.com');
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });

  it('returns undefined for a non-internal path', () => {
    const result = redirectSchema.safeParse('dashboard');
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });
});

describe('loginSearchSchema', () => {
  it('accepts an empty search object', () => {
    const result = loginSearchSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('accepts a valid redirect', () => {
    const result = loginSearchSchema.safeParse({ redirect: '/dashboard' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.redirect).toBe('/dashboard');
    }
  });

  it('sanitizes a protocol-relative redirect to undefined', () => {
    const result = loginSearchSchema.safeParse({ redirect: '//evil.com' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.redirect).toBeUndefined();
    }
  });
});
