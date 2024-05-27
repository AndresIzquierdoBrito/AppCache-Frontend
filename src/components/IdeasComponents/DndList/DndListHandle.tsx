import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { rem, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconGripVertical } from '@tabler/icons-react';
import axios from 'axios';
import cx from 'clsx';
import { useEffect, useState } from 'react';

import classes from './DndListHandle.module.css';

interface Idea {
  ideaId: number;
  title: string;
  description: string;
  color: string;
  order: number;
}

interface DndListHandleProps {
  ideasArray: Idea[];
}

export function DndListHandle({ ideasArray }: DndListHandleProps) {
  const [state, handlers] = useListState(ideasArray);
  const [ideas, setIdeas] = useState(ideasArray);

  useEffect(() => {
    setIdeas(ideasArray);
  }, [ideasArray]);
  const items = ideas.map((item) => (
    <Draggable key={item.ideaId} index={item.order} draggableId={item.ideaId.toString()}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </div>
          <div>
            <Text>{item.title}</Text>
            <Text c="dimmed" size="sm">
              Description: {item.description} • Color: {item.color}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={async ({ destination, source }) => {
        if (!destination) {
          return;
        }
        handlers.reorder({ from: source.index, to: destination.index });

        const newIdeas = Array.from(ideas);
        const [removed] = newIdeas.splice(source.index, 1);
        newIdeas.splice(destination.index, 0, removed);

        newIdeas.forEach((idea, index) => {
          idea.order = index;
        });
        console.log(newIdeas);
        setIdeas(newIdeas);
        try {
          await axios.put('https://localhost:7156/api/Ideas/reorder', newIdeas, {
            withCredentials: true,
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
