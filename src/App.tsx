import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PuzzleList from './components/PuzzleList';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Code-Puzzle-Plattform</h1>
        <Routes>
          <Route path="/" element={<PuzzleList />} />
          <Route path="/puzzle/:id" element={<div>Puzzle {window.location.pathname}</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;