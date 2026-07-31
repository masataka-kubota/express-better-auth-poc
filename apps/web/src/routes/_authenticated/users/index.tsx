import { Avatar, Badge, Card, Group, Stack, Table, Text, Title } from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';

import { demoUsers } from '@/lib/users';

export const Route = createFileRoute('/_authenticated/users/')({
  component: UsersPage,
});

function UsersPage() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Users</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Click a user to open a typed `/users/$userId` route.
        </Text>
      </div>

      <Card withBorder padding="lg" radius="md">
        <Table.ScrollContainer minWidth={520}>
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {demoUsers.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>
                    <Link
                      to="/users/$userId"
                      params={{ userId: user.id }}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Stack gap={2}>
                        <Group gap="xs" align="center">
                          <Avatar name={user.name} color="initials" size={28} radius="xl" />
                          <Text size="sm" fw={600}>
                            {user.name}
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed" pl={38}>
                          {user.email}
                        </Text>
                      </Stack>
                    </Link>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{user.role}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={user.status === 'Active' ? 'teal' : 'gray'}>
                      {user.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </Stack>
  );
}
