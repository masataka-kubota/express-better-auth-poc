import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import AdminShell from '@/components/AdminShell';
import { getSession } from '@/lib/auth';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const authenticated = await getSession();
    if (!authenticated) {
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
