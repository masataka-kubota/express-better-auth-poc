import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { getServerSession } from '@/lib/auth/authSession.functions';

vi.mock('@/lib/auth/authSession.functions', () => ({
  getServerSession: vi.fn(),
}));

describe('sessionQueryOptions', () => {
  beforeEach(() => {
    vi.mocked(getServerSession).mockReset();
  });

  it('uses the shared session query key and delegates to getServerSession', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(true);

    const options = sessionQueryOptions();
    const result = await options.queryFn?.({ queryKey: options.queryKey } as never);

    expect(options.queryKey).toEqual(['session']);
    expect(result).toBe(true);
    expect(getServerSession).toHaveBeenCalledTimes(1);
  });
});
