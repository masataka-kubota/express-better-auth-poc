import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { ReactNode } from 'react';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';

const AdminShell = ({ children }: { children: ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AdminHeader opened={opened} onToggle={toggle} />
      <AdminSidebar opened={opened} onToggle={toggle} />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminShell;
