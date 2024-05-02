import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Navbar</Text>
        </Group>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Burger opened={closed} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
