import { createServerFn } from '@tanstack/react-start';

import { verifyServerSession } from '@/lib/auth/authSession.server';

export const getServerSession = createServerFn({ method: 'GET' }).handler(async () => {
  return verifyServerSession();
});
