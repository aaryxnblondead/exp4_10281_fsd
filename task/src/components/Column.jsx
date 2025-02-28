import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Task from './Task';

const ColumnContainer = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h3`
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 2px solid #e2e8f0;
  margin: 0;
`;

const TaskList = styled.div`
  padding: 16px;
  flex-grow: 1;
  background: ${props => props.isDraggingOver ? '#e2e8f0' : 'inherit'};
  min-height: 100px;
  transition: background-color 0.2s ease;
`;

const Column = ({ column, tasks, deleteTask }) => {
  return (
    <ColumnContainer>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onDelete={() => deleteTask(task.id, column.id)}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default Column;
