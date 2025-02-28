import { Draggable } from '@hello-pangea/dnd';

const getCardColor = (columnName) => {
  switch (columnName) {
    default:
      return '##575D90'; // Red as fallback
  }
};

export default function Task({ task, index, onDelete, columnName }) {
  const cardStyle = {
    backgroundColor: getCardColor(columnName),
    padding: '10px',
    margin: '8px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{...cardStyle, ...provided.draggableProps.style}}
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