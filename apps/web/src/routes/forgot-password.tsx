import { Alert, Button, Stack, TextInput } from '@mantine/core';
import { schemaResolver, useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

import AuthPageLayout from '@/components/AuthPageLayout';
import { forgotPassword } from '@/lib/auth/authActions';
import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { showErrorNotification, showSuccessNotification } from '@/lib/notify';
import { forgotPasswordFormSchema, type ForgotPasswordFormValues } from '@/lib/schemas';

export const Route = createFileRoute('/forgot-password')({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = await context.queryClient.ensureQueryData(sessionQueryOptions());
    if (isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const queryClient = useQueryClient();

  const form = useForm<ForgotPasswordFormValues>({
    mode: 'uncontrolled',
    validate: schemaResolver(forgotPasswordFormSchema, { sync: true }),
  });

  const mutation = useMutation({
    mutationFn: (values: ForgotPasswordFormValues) => forgotPassword(values.email),
    onSuccess: async () => {
      await queryClient.fetchQuery({
        ...sessionQueryOptions(),
        staleTime: 0,
      });
      showSuccessNotification('Email sent', 'Check your inbox for the password reset link.');
      form.reset();
    },
    onError: (error: Error) => {
      showErrorNotification('Password reset failed', error.message);
    },
  });

  return (
    <AuthPageLayout
      title="Forgot your password?"
      description="Enter your email and we will send you a link to reset it."
      footerTo="/login"
      footerLabel="Back to sign in"
    >
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))} noValidate>
        <Stack gap="md">
          {mutation.error ? (
            <Alert color="red" title="Could not send reset email">
              {mutation.error.message}
            </Alert>
          ) : null}

          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Button type="submit" fullWidth loading={mutation.isPending} color="gray">
            Send reset link
          </Button>
        </Stack>
      </form>
    </AuthPageLayout>
  );
}
