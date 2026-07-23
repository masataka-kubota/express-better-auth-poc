import { Avatar, Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { getDemoUser } from '@/lib/users';

export const Route = createFileRoute('/_authenticated/users/$userId')({
  loader: ({ params }) => {
    const user = getDemoUser(params.userId);
    if (!user) {
      throw notFound();
    }
    return { user };
  },
  component: UserDetailPage,
});

function UserDetailPage() {
  const { userId } = Route.useParams();
  const { user } = Route.useLoaderData();

  return (
    <Stack gap="lg">
      <Group>
        <Button
          component={Link}
          to="/users"
          variant="subtle"
          color="gray"
          leftSection={<ArrowLeft size={16} />}
        >
          Back to users
        </Button>
      </Group>

      <Card withBorder padding="xl" radius="md">
        <Group align="flex-start" gap="lg">
          <Avatar name={user.name} color="initials" size={72} radius="xl" />
          <Stack gap="xs" style={{ flex: 1 }}>
            <Group justify="space-between" align="flex-start">
              <div>
                <Title order={2}>{user.name}</Title>
                <Text c="dimmed">{user.email}</Text>
              </div>
              <Badge variant="light" color={user.status === 'Active' ? 'teal' : 'gray'}>
                {user.status}
              </Badge>
            </Group>
            <Text size="sm">
              Role:{' '}
              <Text span fw={600}>
                {user.role}
              </Text>
            </Text>
            <Text size="sm" c="dimmed">
              {user.bio}
            </Text>
            <Text size="xs" c="dimmed" mt="sm">
              Typed route param:{' '}
              <Text span ff="monospace">
                {userId}
              </Text>
            </Text>
          </Stack>
        </Group>
      </Card>
    </Stack>
  );
}
