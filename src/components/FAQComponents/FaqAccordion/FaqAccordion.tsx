import { Accordion, Container, Title } from '@mantine/core';

import classes from './FaqAccordion.module.css';

export function FaqAccordion() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="add-idea">
          <Accordion.Control>How can I add a new idea?</Accordion.Control>
          <Accordion.Panel>
            To add a new idea, simply click on the &quot;Add Idea&quot; button and fill in
            the title and description of your idea. Once you&apos;re done,
            &quot;Submit&quot; to save your idea.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="edit-idea">
          <Accordion.Control>How can I edit an existing idea?</Accordion.Control>
          <Accordion.Panel>
            To edit an existing idea, click on the idea you want to edit. This will open
            up the idea details where you can make changes to the title and description.
            Don&apos;t forget to save your changes!
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="delete-idea">
          <Accordion.Control>How can I delete an idea?</Accordion.Control>
          <Accordion.Panel>
            To delete an idea, click on the idea you want to delete and then click on
            &quot;Delete&quot; button. Please note that this action is irreversible.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
