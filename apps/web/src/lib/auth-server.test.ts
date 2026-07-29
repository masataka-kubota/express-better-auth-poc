import { afterEach, describe, expect, it, vi } from 'vitest';

import { resolveServerSession } from './auth-server';

vi.mock('@/lib/env', () => ({
  env: {
    backendBaseUrl: 'http://localhost:3000',
  },
}));

describe('resolveServerSession', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns true when the session response contains a user', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: '1' } }),
    });

    const headers = { get: (name: string) => (name === 'cookie' ? 'session=abc' : null) };

    await expect(resolveServerSession(headers)).resolves.toBe(true);
  });

  it('returns false when the session response does not contain a user', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: null }),
    });

    const headers = { get: (name: string) => (name === 'cookie' ? 'session=abc' : null) };

    await expect(resolveServerSession(headers)).resolves.toBe(false);
  });

  it('returns false when the session response is null', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });

    const headers = { get: (name: string) => (name === 'cookie' ? 'session=abc' : null) };

    await expect(resolveServerSession(headers)).resolves.toBe(false);
  });

  it('returns false when the backend response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    const headers = { get: (name: string) => (name === 'cookie' ? 'session=expired' : null) };

    await expect(resolveServerSession(headers)).resolves.toBe(false);
  });

  it('rejects when the backend request fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error('ECONNREFUSED'));

    const headers = { get: (name: string) => (name === 'cookie' ? 'session=abc' : null) };

    await expect(resolveServerSession(headers)).rejects.toThrow('ECONNREFUSED');
  });

  it('passes the cookie header to the backend request', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: '1' } }),
    });
    globalThis.fetch = fetchMock;

    const headers = { get: (name: string) => (name === 'cookie' ? 'my-session=xyz' : null) };

    await resolveServerSession(headers);

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/auth/get-session',
      expect.objectContaining({
        headers: expect.objectContaining({ cookie: 'my-session=xyz' }),
      }),
    );
  });

  it('uses an empty cookie string when no cookie header is present', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: null }),
    });
    globalThis.fetch = fetchMock;

    const headers = { get: (_name: string) => null };

    await resolveServerSession(headers);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ cookie: '' }),
      }),
    );
  });
});
