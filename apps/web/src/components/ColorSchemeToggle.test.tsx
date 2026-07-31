import { MantineProvider } from '@mantine/core';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import ColorSchemeToggle from './ColorSchemeToggle';

describe('ColorSchemeToggle', () => {
  it('renders a stable initial label during server rendering', () => {
    const html = renderToStaticMarkup(
      <MantineProvider defaultColorScheme="auto">
        <ColorSchemeToggle />
      </MantineProvider>,
    );

    expect(html).toContain('Switch color scheme');
  });
});
