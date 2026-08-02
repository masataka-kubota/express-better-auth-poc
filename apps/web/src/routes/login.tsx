import { Alert, Anchor, Button, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { schemaResolver, useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import AuthPageLayout from '@/components/AuthPageLayout';
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
      // Login beforeLoad caches `false` with a 5m staleTime. Without forcing a
      // refetch here, _authenticated's ensureQueryData would reuse that value
      // and redirect back to /login. staleTime: 0 applies only to this call.
      await queryClient.fetchQuery({
        ...sessionQueryOptions(),
        staleTime: 0,
      });
      showSuccessNotification('Signed in', 'Welcome back!');
      await navigate({ to: redirectTo ?? '/' });
    },
    onError: (error: Error) => {
      showErrorNotification('Sign in failed', error.message);
    },
  });

  return (
    <AuthPageLayout
      title="Sign in to Console"
      description="Sign in with the seeded Better Auth user to access the admin shell."
      footerTo="/signup"
      footerLabel="Create an account"
    >
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))} noValidate>
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

          <Stack gap={6}>
            <Group justify="space-between" align="center" wrap="nowrap" gap="xs">
              <Text component="label" htmlFor="login-password" size="sm" fw={500}>
                Password
              </Text>
              <Anchor component={Link} to="/forgot-password" size="sm" style={{ flexShrink: 0 }}>
                Forgot password?
              </Anchor>
            </Group>
            <PasswordInput
              id="login-password"
              placeholder="Your password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
          </Stack>

          <Button type="submit" fullWidth loading={mutation.isPending} color="gray">
            Continue
          </Button>
        </Stack>
      </form>
    </AuthPageLayout>
  );
}
