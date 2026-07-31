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
import { schemaResolver, useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import { signIn } from '@/lib/auth/authActions';
import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { showErrorNotification, showSuccessNotification } from '@/lib/notify';
import { loginFormSchema, type LoginFormValues } from '@/lib/schemas';
import { loginSearchSchema } from '@/lib/schemas/routes';

export const Route = createFileRoute('/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  beforeLoad: async ({ context }) => {
    const isAuthenticated = await context.queryClient.ensureQueryData(sessionQueryOptions());
    if (isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { redirect: redirectTo } = Route.useSearch();

  const form = useForm<LoginFormValues>({
    mode: 'uncontrolled',
    validate: schemaResolver(loginFormSchema, { sync: true }),
  });

  const mutation = useMutation({
    mutationFn: (values: LoginFormValues) => signIn(values),
    onSuccess: async () => {
      showSuccessNotification('Signed in', 'Welcome back!');
      // Login beforeLoad caches `false` with a 5m staleTime. Without forcing a
      // refetch here, _authenticated's ensureQueryData would reuse that value
      // and redirect back to /login. staleTime: 0 applies only to this call.
      await queryClient.fetchQuery({
        ...sessionQueryOptions(),
        staleTime: 0,
      });
      navigate({ to: redirectTo ?? '/' });
    },
    onError: (error: Error) => {
      showErrorNotification('Sign in failed', error.message);
    },
  });

  return (
    <Box
      mih="100vh"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Color scheme toggle */}
      <Box
        style={{
          position: 'absolute',
          top: 'var(--mantine-spacing-md)',
          right: 'var(--mantine-spacing-md)',
        }}
      >
        <ColorSchemeToggle />
      </Box>

      {/* Login form */}
      <Container size={420} px="md">
        <Stack gap="lg" align="center">
          <Stack gap={6} align="center">
            <Title order={2} ta="center">
              Sign in to Console
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Sign in with the seeded Better Auth user to access the admin shell.
            </Text>
          </Stack>

          <Paper withBorder p="xl" radius="md" style={{ width: '100%' }}>
            <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
              <Stack gap="md">
                {mutation.error ? (
                  <Alert color="red" title="Could not sign in">
                    {mutation.error.message}
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
