import React from 'react';
import TaskBoard from './components/TaskBoard';
import '../src/styles/components.css';
import './app.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Task Management Board</h1>
      </header>
      <main>
        <TaskBoard />
      </main>
    </div>
  );
}

export default App;