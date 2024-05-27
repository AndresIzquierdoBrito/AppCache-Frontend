import { Button, Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Dots } from './Dots';
import classes from './HeroText.module.css';

export function HeroText() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          {t('homepage.heroText.title')}{' '}
          <Text component="span" className={classes.highlight} inherit>
            {t('homepage.heroText.highlight')}
          </Text>{' '}
          {t('homepage.heroText.subtitle')}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            {t('homepage.heroText.description')}
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            onClick={() => navigate('/login')}
          >
            {t('homepage.heroText.tryItNow')}
          </Button>
          <Button className={classes.control} size="lg" onClick={() => navigate('/faq')}>
            {t('homepage.heroText.learnMore')}
          </Button>
        </div>
      </div>
    </Container>
  );
}
