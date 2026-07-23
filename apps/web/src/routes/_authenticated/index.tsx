import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: OverviewPage,
});

const stats = [
  { label: 'Active sessions', value: '128', hint: '+12% vs last week' },
  { label: 'API requests', value: '24.6k', hint: 'Last 24 hours' },
  { label: 'Error rate', value: '0.4%', hint: 'Within SLO' },
  { label: 'Deployments', value: '18', hint: 'This month' },
];

const recent = [
  { id: 'evt_01', event: 'User signed in', actor: 'admin@example.com', time: '2m ago' },
  { id: 'evt_02', event: 'Worker deployed', actor: 'ci-bot', time: '18m ago' },
  { id: 'evt_03', event: 'KV namespace updated', actor: 'admin@example.com', time: '1h ago' },
  { id: 'evt_04', event: 'Rate limit adjusted', actor: 'ops@example.com', time: '3h ago' },
];

function OverviewPage() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Overview</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Sample console dashboard. Wire real metrics later.
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {stats.map((stat) => (
          <Card key={stat.label} withBorder padding="lg" radius="md">
            <Text size="xs" tt="uppercase" fw={600} c="dimmed">
              {stat.label}
            </Text>
            <Text fz={28} fw={700} mt={6} lh={1.1}>
              {stat.value}
            </Text>
            <Text size="xs" c="dimmed" mt="sm">
              {stat.hint}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      <Card withBorder padding="lg" radius="md">
        <Group justify="space-between" mb="md">
          <Title order={4}>Recent activity</Title>
          <Badge variant="light" color="accent">
            Live sample
          </Badge>
        </Group>
        <Table.ScrollContainer minWidth={520}>
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Event</Table.Th>
                <Table.Th>Actor</Table.Th>
                <Table.Th>When</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recent.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>
                    <Text size="sm" fw={500}>
                      {row.event}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {row.id}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{row.actor}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {row.time}
                    </Text>
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
