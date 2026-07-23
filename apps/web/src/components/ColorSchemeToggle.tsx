import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';

const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const next = computed === 'dark' ? 'light' : 'dark';

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      aria-label={`Switch to ${next} mode`}
      onClick={() => setColorScheme(next)}
    >
      {computed === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
