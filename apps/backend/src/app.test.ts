import { describe, expect, it, vi } from 'vitest';

import { app } from '@/app';

vi.mock('@/lib/auth', () => ({
  auth: {}
}));

vi.mock('better-auth/node', () => ({
  toNodeHandler: () => (_req: unknown, res: { status: (code: number) => { end: () => void } }) =>
    res.status(501).end()
}));

describe('app', () => {
  it('exports an express app that can be started by the runtime entrypoint', () => {
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });
});
