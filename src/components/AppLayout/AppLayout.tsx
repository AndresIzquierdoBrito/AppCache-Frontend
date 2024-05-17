import { AppShell, Burger, Button, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { useAuth } from '@/context/AuthContext';

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { setAuthorized, isAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://localhost:7156/Account/logout',
        {},
        {
          withCredentials: true,
        }
      );
      setAuthorized(false);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

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
        <Button onClick={handleLogout}>Logout</Button>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
