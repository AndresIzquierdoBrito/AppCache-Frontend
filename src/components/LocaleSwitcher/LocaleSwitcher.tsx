import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import english from '@/assets/images/flags/en.png';
import spanish from '@/assets/images/flags/es.png';

import classes from './LocaleSwitcher.module.css';

const data = [
  { code: 'en', label: 'English', image: english },
  { code: 'es', label: 'Español', image: spanish },
];

export function LocaleSwitcher() {
  const [opened, setOpened] = useState(false);
  const { i18n } = useTranslation();

  const [selected, setSelected] = useState(
    data.find((item) => item.code === i18n.language)
  );
  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} width={18} height={18} />}
      onClick={() => {
        setSelected(item);
        i18n.changeLanguage(item.code);
      }}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected?.image} width={22} height={22} />
            <span className={classes.label}>{selected?.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
