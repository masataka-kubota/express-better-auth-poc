import {
  AppShell,
  Box,
  Burger,
  Button,
  Group,
  Menu,
  Modal,
  NavLink,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, LogOut, MoreVertical, Settings, Users } from 'lucide-react';
import type { ReactNode } from 'react';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import { signOut } from '@/lib/auth/authActions';
import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { showErrorNotification, showSuccessNotification } from '@/lib/notify';

const glassStyle = {
  background: 'color-mix(in srgb, var(--mantine-color-body) 72%, transparent)',
  backdropFilter: 'blur(12px)',
  border: '1px solid var(--mantine-color-default-border)',
} as const;

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const;

const AdminShell = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [opened, { toggle }] = useDisclosure();
  const [logoutOpen, { open: openLogout, close: closeLogout }] = useDisclosure();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: session } = useQuery(sessionQueryOptions());

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
          {/* leftSection */}
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

          {/* rightSection */}
          <Group gap="xs">
            {/* color scheme toggle */}
            <ColorSchemeToggle />
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
          {session ? (
            <Menu
              shadow="md"
              width="target"
              position="top-start"
              styles={{ dropdown: { borderRadius: 'var(--mantine-radius-md)', ...glassStyle } }}
            >
              <Menu.Target>
                <Button
                  variant="subtle"
                  color="gray"
                  fullWidth
                  justify="space-between"
                  rightSection={<MoreVertical size={16} />}
                  style={{ fontWeight: 500 }}
                >
                  {session.name}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{session.email}</Menu.Label>
                <Menu.Item color="red" leftSection={<LogOut size={16} />} onClick={openLogout}>
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : null}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      {/* logout modal */}
      <Modal
        opened={logoutOpen}
        onClose={closeLogout}
        title="Log out"
        centered
        overlayProps={{
          style: {
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
          },
        }}
        styles={{
          content: { borderRadius: 'var(--mantine-radius-lg)', ...glassStyle },
        }}
      >
        <Text size="sm" c="dimmed">
          Are you sure you want to log out?
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={closeLogout}>
            Cancel
          </Button>
          <Button
            color="red"
            loading={mutation.isPending}
            onClick={() => {
              closeLogout();
              mutation.mutate();
            }}
          >
            Log out
          </Button>
        </Group>
      </Modal>
    </AppShell>
  );
};

export default AdminShell;
