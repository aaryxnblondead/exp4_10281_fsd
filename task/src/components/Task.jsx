import { Draggable } from '@hello-pangea/dnd';
import './task.css';
const getCardColor = (columnName) => {
  switch (columnName) {
    default:
      return '##575D90'; // Red as fallback
  }
};

const Task = ({ task, index, columnName }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: getCardColor(columnName),
          }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;