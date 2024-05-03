import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router-dom';

import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { UserInfo } from '@/components/UserInfo/UserInfo';

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>AppCache</h1>
          </Link>
          <ThemeToggle />
        </Group>
        <UserInfo />
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
