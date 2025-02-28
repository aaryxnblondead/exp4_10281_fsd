import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, id, onStatusChange, onDelete }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md w-96 backdrop-blur-sm bg-opacity-90">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[600px] transition-all duration-300 ease-in-out"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
