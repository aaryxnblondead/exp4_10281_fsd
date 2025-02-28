import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/globals.css';

const initialTasks = {
  todo: [
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' },
  ],
  inProgress: [
    { id: '3', content: 'Task 3' },
  ],
  completed: [
    { id: '4', content: 'Task 4' },
  ],
};

const Column = ({ title, tasks, id }) => (
  <div className="column">
    <h2 className="column-header">{title}</h2>
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`task ${snapshot.isDragging ? 'task-dragging' : ''}`}
                >
                  {task.content}
                  <button 
                    className="delete-task-button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    ×
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = [...tasks[source.droppableId]];
    const destList = source.droppableId === destination.droppableId
      ? sourceList
      : [...tasks[destination.droppableId]];
    
    const [removed] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = {};
    Object.keys(tasks).forEach(columnId => {
      newTasks[columnId] = tasks[columnId].filter(task => task.id !== taskId);
    });
    setTasks(newTasks);
  };

  const addNewTask = () => {
    const newTask = {
      id: String(Date.now()),
      content: `New Task ${tasks.todo.length + 1}`,
    };
    setTasks({
      ...tasks,
      todo: [...tasks.todo, newTask],
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-board">
        <Column title="To Do" tasks={tasks.todo} id="todo" />
        <Column title="In Progress" tasks={tasks.inProgress} id="inProgress" />
        <Column title="Completed" tasks={tasks.completed} id="completed" />
      </div>
      <button className="add-task-button" onClick={addNewTask}>
        Add New Task
      </button>
    </DragDropContext>
  );
}
