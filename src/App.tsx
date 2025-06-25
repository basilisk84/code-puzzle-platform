import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Puzzle from './pages/Puzzle';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Code-Puzzle-Plattform</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/puzzle/:id" element={<Puzzle />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;