import { afterEach, describe, expect, it } from 'vitest';

import { parsePositiveIntegerEnv, requireEnv } from './env';

describe('requireEnv', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns a trimmed value when the variable is present', () => {
    process.env.TEST_VALUE = '  hello world  ';

    expect(requireEnv('TEST_VALUE')).toBe('hello world');
  });

  it('throws when the variable is missing or empty', () => {
    delete process.env.TEST_VALUE;

    expect(() => requireEnv('TEST_VALUE')).toThrow(/TEST_VALUE is not defined/);

    process.env.TEST_VALUE = '   ';

    expect(() => requireEnv('TEST_VALUE')).toThrow(/TEST_VALUE is not defined/);
  });
});

describe('parsePositiveIntegerEnv', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = originalEnv;
  });

  it('uses the default port when PORT is not set', () => {
    delete process.env.PORT;

    expect(parsePositiveIntegerEnv('PORT', 3000)).toBe(3000);
  });

  it('accepts a positive integer port', () => {
    process.env.PORT = '8080';

    expect(parsePositiveIntegerEnv('PORT', 3000)).toBe(8080);
  });

  it('throws for an invalid port value', () => {
    process.env.PORT = 'abc';

    expect(() => parsePositiveIntegerEnv('PORT', 3000)).toThrow(
      /PORT is not a valid positive integer/
    );
  });
});
