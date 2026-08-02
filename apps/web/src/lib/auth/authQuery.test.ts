import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { getServerSession } from '@/lib/auth/authSession.functions';
import type { SessionUser } from '@/lib/auth/authSession.server';

vi.mock('@/lib/auth/authSession.functions', () => ({
  getServerSession: vi.fn(),
}));

describe('sessionQueryOptions', () => {
  const user: SessionUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
  };

  beforeEach(() => {
    vi.mocked(getServerSession).mockReset();
  });

  it('uses the shared session query key and delegates to getServerSession', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(user);

    const options = sessionQueryOptions();
    const result = await options.queryFn?.({ queryKey: options.queryKey } as never);

    expect(options.queryKey).toEqual(['session']);
    expect(result).toEqual(user);
    expect(getServerSession).toHaveBeenCalledTimes(1);
  });
});
