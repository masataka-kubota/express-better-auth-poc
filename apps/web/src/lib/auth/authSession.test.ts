import { getRequestHeaders } from '@tanstack/react-start/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { resolveServerSession } from '@/lib/auth/authSession.server';

vi.mock('@/lib/env', () => ({
  env: {
    backendBaseUrl: 'http://localhost:3000',
  },
}));

vi.mock('@tanstack/react-start/server', () => ({
  getRequestHeaders: vi.fn(),
}));

describe('resolveServerSession', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.mocked(getRequestHeaders).mockReset();
  });

  const mockHeaders = (cookie: string | null) => {
    vi.mocked(getRequestHeaders).mockReturnValue({
      get: (name: string) => (name === 'cookie' ? cookie : null),
    } as ReturnType<typeof getRequestHeaders>);
  };

  it('returns true when the session response contains a user', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: '1' } }),
    });
    mockHeaders('session=abc');

    await expect(resolveServerSession()).resolves.toBe(true);
  });

  it('returns false when the session response does not contain a user', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: null }),
    });
    mockHeaders('session=abc');

    await expect(resolveServerSession()).resolves.toBe(false);
  });

  it('returns false when the session response is null', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });
    mockHeaders('session=abc');

    await expect(resolveServerSession()).resolves.toBe(false);
  });

  it('returns false when the backend response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });
    mockHeaders('session=expired');

    await expect(resolveServerSession()).resolves.toBe(false);
  });

  it('rejects when the backend request fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error('ECONNREFUSED'));
    mockHeaders('session=abc');

    await expect(resolveServerSession()).rejects.toThrow('ECONNREFUSED');
  });

  it('passes the cookie header to the backend request', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: '1' } }),
    });
    globalThis.fetch = fetchMock;
    mockHeaders('my-session=xyz');

    await resolveServerSession();

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
    mockHeaders(null);

    await resolveServerSession();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ cookie: '' }),
      }),
    );
  });
});
