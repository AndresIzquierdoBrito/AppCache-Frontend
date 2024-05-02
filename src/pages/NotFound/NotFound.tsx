import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import classes from './NotFound.module.css';
const NotFoundTitle = () => {
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place!</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        How did you get here?! Maybe you misstyped the URL or the page was moved.
        Let&apos;s get you back to the home page.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={() => navigate('/')}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};

export default NotFoundTitle;
