import { queryOptions, type QueryClient } from '@tanstack/react-query';

import { getServerSession } from '@/lib/auth-session.functions';

const sessionQueryKey = ['session'] as const;

/**
 * Create TanStack Query options for the authenticated session state.
 */
export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: sessionQueryKey,
    queryFn: () => getServerSession(),
    staleTime: 1000 * 60 * 5,
  });

/**
 * Update the cached session value directly.
 *
 * @param queryClient The TanStack Query client instance.
 * @param value The authenticated state to store in the cache.
 */
export const setSessionQueryValue = (queryClient: QueryClient, value: boolean) => {
  queryClient.setQueryData<boolean>(sessionQueryKey, value);
};
