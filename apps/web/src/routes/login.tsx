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
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (session.data?.user) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Enter a valid email'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    },
    onSuccess: async () => {
      setError(null);
      await navigate({ to: '/' });
    },
    onError: (error: unknown) => {
      setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError(null);
    await mutation.mutateAsync(values);
  };

  return (
    <Box
      mih="100vh"
      style={{
        background:
          'linear-gradient(135deg, var(--mantine-color-gray-0) 0%, var(--mantine-color-gray-1) 100%)',
      }}
    >
      <GroupTop />
      <Container size={420} pt={80} pb={48}>
        <Stack gap="lg">
          <Stack gap={6}>
            <Title order={2}>Sign in to Console</Title>
            <Text c="dimmed" size="sm">
              Sign in with the seeded Better Auth user to access the admin shell.
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
                <Button type="submit" fullWidth loading={mutation.isPending} color="gray">
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
