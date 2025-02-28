import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';
import AddTaskModal from './AddTaskModal';

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 30px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    background: #1d4ed8;
  }
`;

const initialData = {
  tasks: {},
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: [],
    },
    'inProgress': {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: [],
    },
    'completed': {
      id: 'completed',
      title: 'Completed',
      taskIds: [],
    },
  },
  columnOrder: ['todo', 'inProgress', 'completed'],
};
const TaskBoard = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
  };

  const addNewTask = (taskData) => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = {
      id: newTaskId,
      content: taskData.content,
      endTime: taskData.endTime
    };

    const newData = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        todo: {
          ...data.columns.todo,
          taskIds: [...data.columns.todo.taskIds, newTaskId],
        },
      },
    };

    setData(newData);
    setIsModalOpen(false);
  };

  const deleteTask = (taskId, columnId) => {
    const newTaskIds = data.columns[columnId].taskIds.filter(id => id !== taskId);
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newData = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: newTaskIds,
        },
      },
    };

    setData(newData);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardContainer>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                deleteTask={deleteTask}
              />
            );
          })}
        </BoardContainer>
      </DragDropContext>
      <AddButton onClick={() => setIsModalOpen(true)}>
        Add Task
      </AddButton>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addNewTask}
      />
    </>
  );
};

export default TaskBoard;
