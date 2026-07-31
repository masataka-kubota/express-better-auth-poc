import { queryOptions } from '@tanstack/react-query';

import { hasServerSession } from '@/lib/auth/authSession.functions';

const sessionQueryKey = ['session'] as const;

/**
 * Create TanStack Query options for the authenticated session state.
 */
export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: sessionQueryKey,
    queryFn: () => hasServerSession(),
    staleTime: 1000 * 60 * 5,
  });
