import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');

  const countWords = (str) => {
    return str.trim() === '' ? 0 : str.trim().split(/\s+/).length;
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const countCharacters = (str) => {
    return str.replace(/\s/g, '').length;
  };

  return (
    <div className="App" style={{ minHeight: '100vh', width: '100vw' }}>
      <div className="container" style={{ padding: '20px', maxWidth: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <h1>Text Counter</h1>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing here..."
          rows="8"
          style={{ flex: 1, width: '100%', maxWidth: '100%', margin: '20px 0' }}
        />
        <div className="stats" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="stat-box" style={{ flex: '1 1 200px', maxWidth: '300px' }}>
            <h2>{countCharacters(text)}</h2>
            <p>Characters</p>
          </div>
          <div className="stat-box" style={{ flex: '1 1 200px', maxWidth: '300px' }}>
            <h2>{countWords(text)}</h2>
            <p>Words</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;