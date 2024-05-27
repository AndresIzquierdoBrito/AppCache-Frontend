import { Paper, Title, UnstyledButton } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import classes from './CategoryCard.module.css';

export function CategoryCard() {
  return <UnstyledButton component={Card} />;
}

function Card() {
  const { t } = useTranslation();
  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card} mt={10}>
      <div>
        <Title className={classes.title}>{t('app.layout.categories.allIdeas')}</Title>
      </div>
    </Paper>
  );
}
