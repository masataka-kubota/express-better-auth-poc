import { Button, Group, Menu, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { LogOut, MoreVertical } from 'lucide-react';

import { signOut } from '@/lib/auth/authActions';
import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { showErrorNotification, showSuccessNotification } from '@/lib/notify';

const glassStyle = {
  background: 'color-mix(in srgb, var(--mantine-color-body) 72%, transparent)',
  backdropFilter: 'blur(12px)',
  border: '1px solid var(--mantine-color-default-border)',
} as const;

const UserMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [logoutOpen, { open: openLogout, close: closeLogout }] = useDisclosure();
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

  if (!session) {
    return null;
  }

  return (
    <>
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
    </>
  );
};

export default UserMenu;
