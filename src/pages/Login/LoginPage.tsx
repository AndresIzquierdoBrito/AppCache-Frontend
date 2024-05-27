import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { GoogleButton } from '@/components/LoginComponents/SocialButtons';
import { GithubButton } from '@/components/LoginComponents/SocialButtons';
import { useAuth } from '@/context/AuthContext';

const LoginPage = (props: PaperProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialType = location.state?.type || 'login';
  const [type, setType] = useState(initialType);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthorized, setAuthorized } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    setType(initialType);
  }, [location.key]);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/app');
    }
  }, [isAuthorized]);

  const toggle = () => {
    setType((prevType: string) => (prevType === 'login' ? 'register' : 'login'));
  };
  const form = useForm({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    //TODO Please validate this someday
    validate: {
      userName: (val) => (val.length >= 50 ? 'Too long' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (type === 'register') {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!form.validate()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/account/login`,
        form.values,
        {
          withCredentials: true,
        }
      );

      setAuthorized(true);
      navigate('/app');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('Wrong credentials');
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!form.validate()) {
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/account/register`,
        form.values,
        { withCredentials: true }
      );

      const loginCredentials = {
        email: form.values.email,
        password: form.values.password,
      };
      if (response.status === 200) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/account/login`,
          loginCredentials,
          {
            withCredentials: true,
          }
        );

        setAuthorized(true);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('Wrong credentials');
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Center mt={50} key={location.state?.key}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          {t('loginPage.welcome', { type })}
        </Text>
        {loading && <p> {loading && <p>{t('loginPage.loading')}</p>}</p>}
        {error && <p>{t('loginPage.wrongCredentials')}</p>}
        <Group grow mb="sm" mt="md">
          <GoogleButton
            radius="md"
            onClick={() =>
              (window.location.href = `${import.meta.env.VITE_API_URL}/api/Account/login-google`)
            }
          >
            Google
          </GoogleButton>
        </Group>
        <Group grow mb="sm" mt="sm">
          <GithubButton radius="md">GitHub</GithubButton>
        </Group>
        <Divider label={t('loginPage.dividerLabel')} labelPosition="center" my="lg" />

        <form onSubmit={handleSubmit}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label={t('loginPage.userNameLabel')}
                placeholder="Arthur Dent"
                value={form.values.userName}
                onChange={(event) =>
                  form.setFieldValue('userName', event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label={t('loginPage.emailLabel')}
              placeholder={t('loginPage.emailPlaceholder')}
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && t('loginPage.invalidEmail')}
              radius="md"
            />

            <PasswordInput
              required
              label={t('loginPage.passwordLabel')}
              placeholder={t('loginPage.passwordPlaceholder')}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password && t('loginPage.invalidPassword')}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label={t('loginPage.termsLabel')}
                checked={true}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? t('loginPage.alreadyHaveAccount')
                : t('loginPage.noAccount')}
            </Anchor>
            <Button type="submit" radius="xl">
              {(type === 'register' ? 'Register' : 'Login') as string}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default LoginPage;
