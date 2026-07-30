import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import AdminShell from '@/components/AdminShell';
import { sessionQueryOptions } from '@/lib/auth-query';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const isAuthenticated = await context.queryClient.ensureQueryData(sessionQueryOptions());

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }

    return { isAuthenticated };
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
