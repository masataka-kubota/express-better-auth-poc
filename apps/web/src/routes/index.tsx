import { Button, Stack, Text, Title } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <Stack p="xl" gap="md">
      <Title order={1}>Welcome to TanStack Start</Title>
      <Text>Edit `src/routes/index.tsx` to get started.</Text>
      <Button>Mantine is ready</Button>
    </Stack>
  );
}
