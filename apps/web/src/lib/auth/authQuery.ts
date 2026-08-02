import { queryOptions } from '@tanstack/react-query';

import { getServerSession } from '@/lib/auth/authSession.functions';

const sessionQueryKey = ['session'] as const;

/**
 * Create TanStack Query options for the authenticated session.
 *
 * Resolves to the current user, or `null` when there is no valid session.
 */
export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: sessionQueryKey,
    queryFn: () => getServerSession(),
    staleTime: 1000 * 60 * 5,
  });
