import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const TaskContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 8px;
  background: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1e293b;
  font-weight: 500;
`;

const TaskContent = styled.div`
  flex-grow: 1;
`;

const TaskTime = styled.span`
  font-size: 0.875rem;
  color: #64748b;
  margin-left: 12px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 8px;
  
  &:hover {
    background: #fee2e2;
  }
`;

const Task = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <TaskContent>
            {task.content}
            <TaskTime>{task.endTime}</TaskTime>
          </TaskContent>
          <DeleteButton onClick={onDelete}>×</DeleteButton>
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;