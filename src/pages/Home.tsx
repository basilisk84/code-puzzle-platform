import React from 'react';
import PuzzleList from '../components/PuzzleList';

const Home: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Willkommen zur Code-Puzzle-Plattform</h2>
      <PuzzleList />
    </div>
  );
};

export default Home;