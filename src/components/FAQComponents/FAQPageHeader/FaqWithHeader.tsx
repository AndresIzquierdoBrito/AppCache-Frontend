import {
  Container,
  Overlay,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { ContactIconsList } from './ContactIcons';
import classes from './FaqWithHeader.module.css';

const categories = [
  {
    label: 'Customer Support',
    image:
      'https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'User Guides',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Sales Questions',
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
];
const FaqWithHeader = () => {
  const { t } = useTranslation();
  const items = categories.map((category, index) => (
    <UnstyledButton
      style={{ backgroundImage: `url(${category.image})` }}
      className={classes.categoryCard}
      key={t(`faq.categories.${index}.label`)}
    >
      <Overlay color="#000" opacity={0.6} zIndex={1} />
      <Text size="xl" ta="center" fw={700} className={classes.categoryLabel}>
        {t(`faq.categories.${index}.label`)}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container className={classes.wrapper} size="lg">
      <div className={classes.header}>
        <div>
          <Title className={classes.title}> {t('faq.title')}</Title>
          <Title className={classes.titleOverlay} role="presentation">
            FAQ
          </Title>
        </div>
        <div className={classes.contact}>
          <Text size="xl" fw={500} className={classes.contactTitle}>
            {t('faq.contactUs')}
          </Text>
          <ContactIconsList />
        </div>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 3 }}>{items}</SimpleGrid>
    </Container>
  );
};

export default FaqWithHeader;
