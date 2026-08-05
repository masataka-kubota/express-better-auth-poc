import { describe, expect, it } from 'vitest';

import { app } from '@/app';

describe('app', () => {
  it('exports an express app that can be started by the runtime entrypoint', () => {
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });
});
