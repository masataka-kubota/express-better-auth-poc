import { Alert, Button, PasswordInput, Stack } from '@mantine/core';
import { schemaResolver, useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import AuthPageLayout from '@/components/AuthPageLayout';
import { resetPassword } from '@/lib/auth/authActions';
import { sessionQueryOptions } from '@/lib/auth/authQuery';
import { showErrorNotification, showSuccessNotification } from '@/lib/notify';
import { resetPasswordFormSchema, type ResetPasswordFormValues } from '@/lib/schemas';
import { resetPasswordSearchSchema } from '@/lib/schemas/routes';

export const Route = createFileRoute('/reset-password')({
  validateSearch: (search) => resetPasswordSearchSchema.parse(search),
  beforeLoad: async ({ context }) => {
    const isAuthenticated = await context.queryClient.ensureQueryData(sessionQueryOptions());
    if (isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = Route.useSearch();

  const form = useForm<ResetPasswordFormValues>({
    mode: 'uncontrolled',
    validate: schemaResolver(resetPasswordFormSchema, { sync: true }),
  });

  const mutation = useMutation({
    mutationFn: (values: ResetPasswordFormValues) =>
      resetPassword({ token, newPassword: values.newPassword }),
    onSuccess: async () => {
      queryClient.clear();
      showSuccessNotification('Password reset', 'Your password has been updated.');
      await navigate({ to: '/login', search: { redirect: undefined } });
    },
    onError: (error: Error) => {
      showErrorNotification('Password reset failed', error.message);
    },
  });

  return (
    <AuthPageLayout
      title="Reset your password"
      description="Enter a new password for your account."
    >
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))} noValidate>
        <Stack gap="md">
          {mutation.error ? (
            <Alert color="red" title="Could not reset password">
              {mutation.error.message}
            </Alert>
          ) : null}

          <PasswordInput
            label="New password"
            placeholder="New password"
            key={form.key('newPassword')}
            {...form.getInputProps('newPassword')}
          />
          <Button type="submit" fullWidth loading={mutation.isPending} color="gray">
            Update password
          </Button>
        </Stack>
      </form>
    </AuthPageLayout>
  );
}
