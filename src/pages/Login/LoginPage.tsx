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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GithubButton, GoogleButton } from '@/components/LoginComponents/SocialButtons';
import { useAuth } from '@/context/AuthContext';

const LoginPage = (props: PaperProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialType = location.state?.type || 'login';
  const [type, setType] = useState(initialType);
  const { setAuthorized } = useAuth();

  useEffect(() => {
    setType(initialType);
  }, [location.key]);

  const toggle = () => {
    setType((prevType: string) => (prevType === 'login' ? 'register' : 'login'));
  };
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const handleSubmit = async () => {
    if (!form.validate) {
      return;
    }

    const response = await fetch('https://localhost:7156/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
      credentials: 'include',
    });

    if (response.ok) {
      setAuthorized(true);
      navigate('/app');
    } else {
      console.error('Failed to log in');
    }
  };

  return (
    <Center mt={50} key={location.state?.key}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to AppCache, {type} with
        </Text>

        <Group grow mb="sm" mt="md">
          <GoogleButton
            radius="md"
            onClick={() =>
              (window.location.href = 'https://localhost:7156/Account/login-google')
            }
          >
            Continue with Google
          </GoogleButton>
        </Group>
        <Group grow mb="sm" mt="sm">
          <GithubButton radius="md">Continue with GitHub</GithubButton>
        </Group>
        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password && 'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
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
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
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
