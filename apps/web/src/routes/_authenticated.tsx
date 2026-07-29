import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import AdminShell from '@/components/AdminShell';
import { getServerSession } from '@/lib/auth-server';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const session = await getServerSession();
    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
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
