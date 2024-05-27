import { rem, Stack, Text, ThemeIcon } from '@mantine/core';
import {
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconSun,
} from '@tabler/icons-react';

import classes from './ContactIcons.module.css';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <ThemeIcon size={40} radius="md" className={classes.icon}>
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </ThemeIcon>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'andres.izbri@gmail.com', icon: IconAt },
  { title: 'Telegram', description: '@andresnecro', icon: IconBrandTelegram },
  { title: 'LinkedIn', description: 'andresizbri', icon: IconBrandLinkedin },
  { title: 'GitHub', description: 'AndresIzquierdoBrito', icon: IconBrandGithub },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}
