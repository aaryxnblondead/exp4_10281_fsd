import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TaskColumn from './TaskColumn';
import AddTaskForm from './AddTaskForm';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title) => {
    const newTask = {
      id: uuidv4(),
      title,
      status: 'todo'
    };
    setTasks([...tasks, newTask]);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);
    
    setTasks(updatedTasks);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <AddTaskForm onAddTask={handleAddTask} />
      <div className="flex gap-8 mt-8 flex-wrap justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskColumn
            title="To Do"
            id="todo"
            tasks={tasks.filter(task => task.status === 'todo')}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
          <TaskColumn
            title="In Progress"
            id="inProgress"
            tasks={tasks.filter(task => task.status === 'inProgress')}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
          <TaskColumn
            title="Completed"
            id="completed"
            tasks={tasks.filter(task => task.status === 'completed')}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;