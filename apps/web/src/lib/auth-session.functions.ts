import { createServerFn } from '@tanstack/react-start';

import { resolveServerSession } from '@/lib/auth-session.server';

export const getServerSession = createServerFn({ method: 'GET' }).handler(async () => {
  return resolveServerSession();
});
