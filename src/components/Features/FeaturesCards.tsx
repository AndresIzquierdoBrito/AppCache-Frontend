import {
  Badge,
  Card,
  Container,
  Group,
  rem,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconCookie, IconGauge, IconUser } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import classes from './FeaturesCards.module.css';

const data = [
  {
    title: 'homepage.features.cards.0.title',
    description: 'homepage.features.cards.0.description',
    icon: IconGauge,
  },
  {
    title: 'homepage.features.cards.1.title',
    description: 'homepage.features.cards.1.description',
    icon: IconUser,
  },
  {
    title: 'homepage.features.cards.2.title',
    description: 'homepage.features.cards.2.description',
    icon: IconCookie,
  },
];

export function FeaturesCards() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const features = data.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.orange[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {t(feature.title)}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {t(feature.description)}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          {t('homepage.features.badge')}
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        {t('homepage.features.title')}
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        {t('homepage.features.description')}
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
