import TaskBoard from './components/TaskBoard';
import LiveClock from './components/LiveClock';
import './styles/globals.css';

export default function App() {
  return (
    <div>
      <LiveClock />
      <h1>Task Management Board</h1>
      <TaskBoard />
    </div>
  );
}
