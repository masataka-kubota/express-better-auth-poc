import {
  Alert,
  Anchor,
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import { DEMO_CREDENTIALS, getSession, login } from '@/lib/auth';

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const authenticated = await getSession();
    if (authenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Enter a valid email'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  return (
    <Box
      mih="100vh"
      style={{
        background: 'linear-gradient(135deg, var(--mantine-color-gray-0) 0%, var(--mantine-color-gray-1) 100%)',
      }}
    >
      <GroupTop />
      <Container size={420} pt={80} pb={48}>
        <Stack gap="lg">
          <Stack gap={6}>
            <Title order={2}>Sign in to Console</Title>
            <Text c="dimmed" size="sm">
              Temporary demo auth for the admin shell. Better Auth will replace this later.
            </Text>
          </Stack>

          <Paper
            withBorder
            p="xl"
            radius="md"
            style={{
              background: 'var(--mantine-color-body)',
              borderColor: 'var(--mantine-color-gray-3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            }}
          >
            <form
              onSubmit={form.onSubmit(async (values) => {
                setSubmitting(true);
                setError(null);
                try {
                  const result = await login({ data: values });
                  if (!result.ok) {
                    setError(result.error);
                    return;
                  }
                  await navigate({ to: '/' });
                } catch {
                  setError('Something went wrong. Please try again.');
                } finally {
                  setSubmitting(false);
                }
              })}
            >
              <Stack gap="md">
                {error ? (
                  <Alert color="red" title="Could not sign in">
                    {error}
                  </Alert>
                ) : null}

                <TextInput
                  label="Email"
                  placeholder="admin@example.com"
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  key={form.key('password')}
                  {...form.getInputProps('password')}
                />
                <Button type="submit" fullWidth loading={submitting} color="gray">
                  Continue
                </Button>
              </Stack>
            </form>
          </Paper>

          <Text size="xs" c="dimmed">
            Demo credentials are prefilled:{' '}
            <Text span fw={600} c="var(--mantine-color-text)">
              {DEMO_CREDENTIALS.email}
            </Text>{' '}
            /{' '}
            <Text span fw={600} c="var(--mantine-color-text)">
              {DEMO_CREDENTIALS.password}
            </Text>
            . Inspired by docs consoles from{' '}
            <Anchor href="https://developers.cloudflare.com/" target="_blank" size="xs">
              Cloudflare
            </Anchor>{' '}
            and{' '}
            <Anchor href="https://tanstack.com/" target="_blank" size="xs">
              TanStack
            </Anchor>
            .
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

function GroupTop() {
  return (
    <Box px="md" pt="md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ColorSchemeToggle />
    </Box>
  );
}
