import { Anchor, Box, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';

/** Shared max width for sign-in / sign-up / password recovery forms. */
export const AUTH_FORM_MAX_WIDTH = 440;

type AuthPageLayoutProps = {
  /** Page title displayed at the top of the auth page. */
  title: string;
  /** Page description displayed below the title. */
  description: string;
  /** The form content to display in the auth page. */
  children: ReactNode;
  /** Destination for the footer link. Shown only when both this and `footerLabel` are set. */
  footerTo?: '/login' | '/signup' | '/forgot-password' | '/reset-password';
  /** Label for the footer link. Shown only when both this and `footerTo` are set. */
  footerLabel?: string;
};

/**
 * Centered auth page shell with a fixed form width across auth routes.
 */
const AuthPageLayout = ({
  title,
  description,
  children,
  footerTo,
  footerLabel,
}: AuthPageLayoutProps) => {
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
      <Box
        style={{
          position: 'absolute',
          top: 'var(--mantine-spacing-md)',
          right: 'var(--mantine-spacing-md)',
        }}
      >
        <ColorSchemeToggle />
      </Box>

      <Container size={AUTH_FORM_MAX_WIDTH} w="100%" maw={AUTH_FORM_MAX_WIDTH} px="md">
        <Stack gap="lg" w="100%" maw={AUTH_FORM_MAX_WIDTH} miw={0}>
          <Stack gap={6} align="center">
            <Title order={2} ta="center">
              {title}
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              {description}
            </Text>
          </Stack>

          <Paper withBorder p="xl" radius="md" w="100%">
            {children}
          </Paper>

          {footerTo && footerLabel ? (
            <Anchor component={Link} to={footerTo} size="sm" ta="center" display="block">
              {footerLabel}
            </Anchor>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
};

export default AuthPageLayout;
