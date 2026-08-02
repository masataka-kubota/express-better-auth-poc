import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { schemaResolver, useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import AuthPageLayout from '@/components/AuthPageLayout';
import { signUp } from '@/lib/auth/authActions';
import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { showErrorNotification, showSuccessNotification } from '@/lib/notify';
import { signupFormSchema, type SignupFormValues } from '@/lib/schemas';

export const Route = createFileRoute('/signup')({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(sessionQueryOptions());
    if (session) {
      throw redirect({ to: '/' });
    }
  },
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<SignupFormValues>({
    mode: 'uncontrolled',
    validate: schemaResolver(signupFormSchema, { sync: true }),
  });

  const mutation = useMutation({
    mutationFn: (values: SignupFormValues) => signUp(values),
    onSuccess: async () => {
      await queryClient.fetchQuery({
        ...sessionQueryOptions(),
        staleTime: 0,
      });
      showSuccessNotification('Account created', 'Please check your email to verify your account.');
      await navigate({ to: '/login', search: { redirect: undefined } });
    },
    onError: (error: Error) => {
      showErrorNotification('Sign up failed', error.message);
    },
  });

  return (
    <AuthPageLayout
      title="Create your account"
      description="Create an account to access the console."
      footerTo="/login"
      footerLabel="Already have an account? Sign in"
    >
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))} noValidate>
        <Stack gap="md">
          {mutation.error ? (
            <Alert color="red" title="Could not create account">
              {mutation.error.message}
            </Alert>
          ) : null}

          <TextInput
            label="Name"
            placeholder="Your name"
            required
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth loading={mutation.isPending} color="gray">
            Create account
          </Button>
        </Stack>
      </form>
    </AuthPageLayout>
  );
}
