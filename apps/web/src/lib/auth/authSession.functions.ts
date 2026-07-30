import { createServerFn } from '@tanstack/react-start';

import { verifyServerSession } from '@/lib/auth/authSession.server';

export const hasServerSession = createServerFn({ method: 'GET' }).handler(async () => {
  return verifyServerSession();
});
