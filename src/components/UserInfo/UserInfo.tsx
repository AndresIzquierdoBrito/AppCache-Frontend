import { Avatar, Paper, Text } from '@mantine/core';

export function UserInfo() {
  return (
    <Paper radius="md" bg="var(--mantine-color-body)">
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        Andrew
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        andres.izbri@gmail.com
      </Text>
    </Paper>
  );
}
