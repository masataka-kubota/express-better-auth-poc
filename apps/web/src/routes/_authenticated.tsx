import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import AdminShell from '@/components/AdminShell';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data?.user) {
      throw redirect({ to: '/login' });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
