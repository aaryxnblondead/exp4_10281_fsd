import { Draggable } from '@hello-pangea/dnd';

export default function Task({ task, index, onDelete }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{task.content}</div>
          <div className="task-controls">
            <button 
              className="button button-delete"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
