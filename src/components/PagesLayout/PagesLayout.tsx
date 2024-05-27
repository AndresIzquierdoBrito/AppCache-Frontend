import {
  AppShell,
  Burger,
  Button,
  Center,
  Group,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

import classes from './PagesLayout.module.css';
const PagesLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
              <Link to="/app" className={classes.undecoratedLink}>
                <h1>Izbri</h1>
              </Link>
              <ThemeToggle />
            </Group>
            <div></div> {/* Spacers to center */}
            <div></div>
            <Center inline>
              <Link to="/" className={classes.undecoratedLink}>
                <h1 className={classes.title}>AppCache</h1>
              </Link>{' '}
            </Center>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                className={classes.control}
                onClick={() => navigate('/faq')}
              >
                FAQ
              </UnstyledButton>
            </Group>
          </Group>
          <Group px="md" visibleFrom="sm">
            <LocaleSwitcher />
            {isAuthorized ? (
              <Button onClick={() => navigate('/app')}>Open</Button>
            ) : (
              <>
                <Button
                  onClick={() =>
                    navigate('/login', {
                      state: { type: 'login', key: Date.now() },
                    })
                  }
                >
                  {t('header.login')}
                </Button>
                <Button
                  onClick={() =>
                    navigate('/login', {
                      state: { type: 'register', key: Date.now() },
                    })
                  }
                >
                  Sign up
                </Button>
              </>
            )}
          </Group>{' '}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Stack px="md">
          <UnstyledButton
            className={classes.control}
            onClick={() => {
              navigate('/faq');
              toggle();
            }}
          >
            FAQ
          </UnstyledButton>
          {isAuthorized ? (
            <Button onClick={() => navigate('/app')}>Open</Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate('/login', {
                    state: { type: 'login', key: Date.now() },
                  });
                  toggle();
                }}
              >
                {t('header.login')}
              </Button>
              <Button
                onClick={() => {
                  navigate('/login', {
                    state: { type: 'register', key: Date.now() },
                  });
                  toggle();
                }}
              >
                {t('header.signup')}
              </Button>
            </>
          )}
          <Center>
            <LocaleSwitcher />
          </Center>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default PagesLayout;
