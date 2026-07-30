import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { hasServerSession } from '@/lib/auth/authSession.functions';

vi.mock('@/lib/auth/authSession.functions', () => ({
  hasServerSession: vi.fn(),
}));

describe('sessionQueryOptions', () => {
  beforeEach(() => {
    vi.mocked(hasServerSession).mockReset();
  });

  it('uses the shared session query key and delegates to hasServerSession', async () => {
    vi.mocked(hasServerSession).mockResolvedValueOnce(true);

    const options = sessionQueryOptions();
    const result = await options.queryFn?.({ queryKey: options.queryKey } as never);

    expect(options.queryKey).toEqual(['session']);
    expect(result).toBe(true);
    expect(hasServerSession).toHaveBeenCalledTimes(1);
  });
});
