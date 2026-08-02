import { AppShell, Box, Burger, Group, Title } from '@mantine/core';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';

interface AdminHeaderProps {
  opened: boolean;
  onToggle: () => void;
}

const AdminHeader = ({ opened, onToggle }: AdminHeaderProps) => {
  return (
    <AppShell.Header
      px="md"
      style={{
        borderBottom: '1px solid var(--mantine-color-default-border)',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Group h="100%" justify="space-between">
        <Group gap="sm">
          <Burger opened={opened} onClick={onToggle} hiddenFrom="sm" size="sm" />
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
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default AdminHeader;
