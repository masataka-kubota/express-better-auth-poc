import { Box, Button, Container, Text, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import ColorSchemeToggle from '@/components/ColorSchemeToggle';

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
          {/* Illustration — Sloth hanging from a branch */}
          <svg
            viewBox="0 0 280 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '100%',
              maxWidth: 320,
              height: 'auto',
              marginBottom: '1rem',
            }}
          >
            {/* Branch */}
            <path
              d="M10 55Q60 45 140 50Q220 55 270 45"
              stroke="#8B6914"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Small leaves on branch */}
            <ellipse
              cx="50"
              cy="42"
              rx="12"
              ry="6"
              fill="#4ade80"
              opacity="0.7"
              transform="rotate(-20 50 42)"
            />
            <ellipse
              cx="230"
              cy="40"
              rx="10"
              ry="5"
              fill="#22c55e"
              opacity="0.6"
              transform="rotate(15 230 40)"
            />

            {/* Sloth body */}
            <ellipse cx="140" cy="110" rx="42" ry="38" fill="#C4A882" />
            <ellipse cx="140" cy="115" rx="32" ry="28" fill="#D4BE9C" />

            {/* Sloth head */}
            <circle cx="140" cy="72" r="28" fill="#C4A882" />

            {/* Eye patches (sloth signature) */}
            <ellipse cx="124" cy="72" rx="12" ry="10" fill="#8B7355" />
            <ellipse cx="156" cy="72" rx="12" ry="10" fill="#8B7355" />

            {/* Eyes (half-closed, sleepy) */}
            <ellipse cx="124" cy="73" rx="5" ry="3.5" fill="#1e293b" />
            <ellipse cx="156" cy="73" rx="5" ry="3.5" fill="#1e293b" />
            <circle cx="125.5" cy="71.5" r="1.8" fill="white" />
            <circle cx="157.5" cy="71.5" r="1.8" fill="white" />

            {/* Nose */}
            <ellipse cx="140" cy="80" rx="4" ry="3" fill="#5C4033" />

            {/* Sleepy smile */}
            <path
              d="M133 86Q140 90 147 86"
              stroke="#5C4033"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Arms hanging down gripping branch */}
            <path
              d="M110 95Q100 80 105 58"
              stroke="#A8896A"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M170 95Q180 80 175 58"
              stroke="#A8896A"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            {/* Claws on branch */}
            <path d="M100 56L97 52" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
            <path d="M104 55L103 50" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
            <path d="M108 56L109 51" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
            <path d="M172 56L169 52" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
            <path d="M176 55L175 50" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
            <path d="M180 56L181 51" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />

            {/* Zzz — sleepy */}
            <text
              x="195"
              y="55"
              fontSize="16"
              fill="#667eea"
              fontWeight="bold"
              opacity="0.5"
              fontFamily="sans-serif"
            >
              z
            </text>
            <text
              x="210"
              y="42"
              fontSize="12"
              fill="#764ba2"
              fontWeight="bold"
              opacity="0.4"
              fontFamily="sans-serif"
            >
              z
            </text>
            <text
              x="220"
              y="32"
              fontSize="9"
              fill="#667eea"
              fontWeight="bold"
              opacity="0.3"
              fontFamily="sans-serif"
            >
              z
            </text>

            {/* Floating dots */}
            <circle cx="40" cy="140" r="4" fill="#667eea" opacity="0.3" />
            <circle cx="240" cy="130" r="3" fill="#764ba2" opacity="0.3" />
            <circle cx="30" cy="170" r="5" fill="#4ade80" opacity="0.2" />
            <circle cx="250" cy="175" r="4" fill="#f093fb" opacity="0.2" />
          </svg>

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
