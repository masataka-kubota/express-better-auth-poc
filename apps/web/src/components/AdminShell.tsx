import {
  AppShell,
  Box,
  Burger,
  Button,
  Group,
  NavLink,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import type { ReactNode } from 'react';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import { signOut } from '@/lib/auth/authActions';
import { showErrorNotification, showSuccessNotification } from '@/lib/notify';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const;

const AdminShell = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [opened, { toggle }] = useDisclosure();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      showSuccessNotification('Signed out', 'You have been signed out successfully.');
      queryClient.clear();
      navigate({ to: '/login', search: { redirect: undefined } });
    },
    onError: (error: Error) => {
      showErrorNotification('Sign out failed', error.message);
    },
  });

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
      <AppShell.Header
        px="md"
        style={{
          borderBottom: '1px solid var(--mantine-color-default-border)',
          background: 'var(--mantine-color-body)',
        }}
      >
        <Group h="100%" justify="space-between">
          <Group gap="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap={8}>
              <Box
                w={10}
                h={10}
                style={{
                  borderRadius: 999,
                  background: 'var(--mantine-color-gray-7)',
                  boxShadow:
                    '0 0 0 3px color-mix(in srgb, var(--mantine-color-gray-7) 18%, transparent)',
                }}
              />
              <Title order={4} fw={700}>
                Console
              </Title>
            </Group>
          </Group>
          <Group gap="xs">
            <ColorSchemeToggle />
            <Button
              variant="subtle"
              color="gray"
              leftSection={<LogOut size={16} />}
              onClick={() => mutation.mutate()}
            >
              Log out
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

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
                    toggle();
                  }
                }}
              />
            );
          })}
        </AppShell.Section>
        <AppShell.Section>
          <Text size="xs" c="dimmed" px="sm">
            Demo auth — replace with Better Auth later
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminShell;
