import { AppShell, NavLink, ScrollArea, Text } from '@mantine/core';
import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Settings, Users } from 'lucide-react';

import UserMenu from '@/components/UserMenu';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const;

interface AdminSidebarProps {
  opened: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ opened, onToggle }: AdminSidebarProps) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AppShell.Navbar
      p="md"
      style={{
        borderRight: '1px solid var(--mantine-color-default-border)',
        background: 'var(--mantine-color-body)',
      }}
    >
      <AppShell.Section grow component={ScrollArea}>
        <Text size="xs" tt="uppercase" c="dimmed" fw={600} mb="sm" px="sm">
          Platform
        </Text>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === '/'
              ? pathname === '/'
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <NavLink
              key={item.to}
              component={Link}
              to={item.to}
              label={item.label}
              leftSection={<Icon size={18} />}
              active={active}
              variant="subtle"
              mb={4}
              style={{ borderRadius: 'var(--mantine-radius-sm)' }}
              onClick={() => {
                if (opened) {
                  onToggle();
                }
              }}
            />
          );
        })}
      </AppShell.Section>
      <AppShell.Section>
        <UserMenu />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AdminSidebar;
