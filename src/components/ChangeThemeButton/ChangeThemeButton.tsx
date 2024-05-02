import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

const ChangeThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color="gray"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? (
        <IconSun style={{ width: 18, height: 18 }} />
      ) : (
        <IconMoon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
};

export default ChangeThemeButton;
