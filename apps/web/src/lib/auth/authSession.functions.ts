import { createServerFn } from '@tanstack/react-start';

import { resolveServerSession } from '@/lib/auth/authSession.server';

export const getServerSession = createServerFn({ method: 'GET' }).handler(async () => {
  return resolveServerSession();
});
