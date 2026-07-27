import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import AdminShell from '@/components/AdminShell';
import { hasValidSession } from '@/lib/auth-client';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const authenticated = await hasValidSession();
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
