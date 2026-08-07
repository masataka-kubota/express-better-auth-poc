import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/env', () => ({
  env: {
    frontendUrls: ['http://localhost:5173'],
    betterAuthUrl: 'http://localhost:3000',
    betterAuthSecret: 'test-secret',
    databaseUrl: 'mysql://user:pass@localhost:3306/test',
    smtpFrom: 'noreply@localhost',
    resendApiKey: undefined,
    port: 3000
  },
  isDev: true
}));

vi.mock('@/lib/auth', () => ({
  auth: {}
}));

vi.mock('better-auth/node', () => ({
  toNodeHandler: () => (_req: unknown, res: { status: (code: number) => { end: () => void } }) =>
    res.status(501).end()
}));

describe('app', () => {
  it('exports an express app that can be started by the runtime entrypoint', async () => {
    const { app } = await import('@/app');

    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });
});
