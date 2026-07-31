import { Box, Button, Container, Text, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import SlothIllustration from '@/components/SlothIllustration';

/**
 * NotFound component displays a 404 error page with a sloth illustration and a link to go back home.
 * It is used as the notFoundComponent in the root route configuration.
 */
export const NotFound = () => {
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

      <Container size="sm" px="md">
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SlothIllustration />

          <Title
            order={1}
            style={{
              fontSize: 'clamp(3rem, 10vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.25rem',
            }}
          >
            404
          </Title>
          <Title order={2} mt="xs" fw={600} size="h2">
            Lost in the forest?
          </Title>
          <Text c="dimmed" mt="sm" size="lg" style={{ maxWidth: 420 }}>
            This page wandered off the trail. Let's get you back home.
          </Text>
          <Button component={Link} to="/" mt="xl" size="lg" variant="light" color="gray">
            ← Go back home
          </Button>
        </div>
      </Container>
    </Box>
  );
};
