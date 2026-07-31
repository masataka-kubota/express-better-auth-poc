import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';

import classes from './ColorSchemeToggle.module.css';

const ColorSchemeToggle = () => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      aria-label="Switch color scheme"
      onClick={toggleColorScheme}
    >
      <Sun size={18} className={classes.sun} />
      <Moon size={18} className={classes.moon} />
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
