import { Card, Stack, Switch, Text, TextInput, Title } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Settings</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Placeholder workspace preferences.
        </Text>
      </div>

      <Card withBorder padding="lg" radius="md">
        <Stack gap="md">
          <TextInput label="Workspace name" defaultValue="express-better-auth-poc" />
          <TextInput label="Support email" defaultValue="ops@example.com" />
          <Switch
            label="Email digest"
            description="Weekly summary of console activity"
            defaultChecked
          />
          <Switch label="Require 2FA" description="Enforced after Better Auth lands" />
        </Stack>
      </Card>
    </Stack>
  );
}
