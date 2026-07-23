import { createTheme, type MantineColorsTuple } from '@mantine/core';

const monochrome: MantineColorsTuple = [
  '#f8f9fa',
  '#f1f3f5',
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#adb5bd',
  '#868e96',
  '#495057',
  '#343a40',
  '#212529',
];

export const theme = createTheme({
  primaryColor: 'gray',
  colors: {
    gray: monochrome,
  },
  primaryShade: 6,
  defaultRadius: 'sm',
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: '600',
  },
  components: {
    ActionIcon: {
      defaultProps: {
        variant: 'subtle',
        color: 'gray',
      },
    },
    Button: {
      defaultProps: {
        color: 'gray',
      },
    },
    NavLink: {
      defaultProps: {
        color: 'gray',
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
      },
    },
  },
  other: {
    adminSidebarWidth: 260,
  },
});
