import {
  Alert,
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
import { authClient } from '@/lib/auth-client';
import { getServerSession } from '@/lib/auth-session.functions';
import { getAuthErrorMessage } from '@/utils/auth-errors';

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const isAuthenticated = await getServerSession();
    if (isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Enter a valid email'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setError(null);
          setIsSubmitting(true);
        },
        onSuccess: async () => {
          setIsSubmitting(false);
          await navigate({ to: '/' });
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(getAuthErrorMessage(ctx.error));
        },
      },
    );
  };

  return (
    <Box mih="100vh">
      <GroupTop />
      <Container size={420} pt={80} pb={48}>
        <Stack gap="lg">
          <Stack gap={6}>
            <Title order={2}>Sign in to Console</Title>
            <Text c="dimmed" size="sm">
              Sign in with the seeded Better Auth user to access the admin shell.
            </Text>
          </Stack>

          <Paper withBorder p="xl" radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
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
                <Button type="submit" fullWidth loading={isSubmitting} color="gray">
                  Continue
                </Button>
              </Stack>
            </form>
          </Paper>
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
