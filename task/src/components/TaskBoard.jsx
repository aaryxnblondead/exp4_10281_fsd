import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import AddTaskModal from './AddTaskModal';

const initialColumns = {
  'todo': {
    id: 'todo',
    title: 'To Do',
    taskIds: []
  },
  'inProgress': {
    id: 'inProgress',
    title: 'In Progress',
    taskIds: []
  },
  'completed': {
    id: 'completed',
    title: 'Completed',
    taskIds: []
  }
};

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    });
  };

  const addTask = (content) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content };
    
    setTasks({
      ...tasks,
      [newTaskId]: newTask
    });

    const newTaskIds = Array.from(columns.todo.taskIds);
    newTaskIds.push(newTaskId);

    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        taskIds: newTaskIds
      }
    });
  };

  const deleteTask = (taskId) => {
    const newTasks = { ...tasks };
    delete newTasks[taskId];
    setTasks(newTasks);

    const newColumns = { ...columns };
    Object.keys(newColumns).forEach(columnId => {
      newColumns[columnId] = {
        ...newColumns[columnId],
        taskIds: newColumns[columnId].taskIds.filter(id => id !== taskId)
      };
    });
    setColumns(newColumns);
  };

  return (
    <>
      <button 
        className="button"
        onClick={() => setShowModal(true)}
        style={{ marginBottom: '20px' }}
      >
        Add New Task
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {Object.values(columns).map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={column.taskIds.map(taskId => tasks[taskId])}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={addTask}
        />
      )}
    </>
  );
}
