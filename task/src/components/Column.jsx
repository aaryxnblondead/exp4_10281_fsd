import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';

const Column = ({ column }) => {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {column.tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index}
                columnName={column.title}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
