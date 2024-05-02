import { AppShell, Burger, Button, Center, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';

import ChangeThemeButton from '../ChangeThemeButton/ChangeThemeButton';
import classes from './PagesLayout.module.css';
const PagesLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" style={{ alignContent: 'center' }}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group>
              <h1>Izbri</h1>
              <ChangeThemeButton />
            </Group>
            <div></div> {/* Spacers to center */}
            <div></div>
            <Center inline>
              <h1 className={classes.title}>AppCache</h1>
            </Center>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                className={classes.control}
                onClick={() => navigate('/faq')}
              >
                FAQ
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => navigate('/faq')}
              >
                Support
              </UnstyledButton>
            </Group>
          </Group>
          <Group px="md">
            <LocaleSwitcher />
            <Button
              variant="default"
              onClick={() =>
                navigate('/login', {
                  state: { type: 'login', key: Date.now() },
                })
              }
            >
              Log in
            </Button>
            <Button
              onClick={() =>
                navigate('/login', {
                  state: { type: 'register', key: Date.now() },
                })
              }
            >
              Sign up
            </Button>{' '}
          </Group>{' '}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>EE</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default PagesLayout;
