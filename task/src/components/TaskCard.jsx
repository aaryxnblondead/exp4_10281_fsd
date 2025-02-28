import React from 'react';
import './taskcard.css';
const TaskCard = ({ task, onStatusChange, onDelete }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <div className="task-controls">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="status-select"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={() => onDelete(task.id)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;