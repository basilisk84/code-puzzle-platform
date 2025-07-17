import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PuzzleSolver = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');

  const handleSolve = () => {
    setResult(solution.toLowerCase() === 'test' ? 'Richtig! +20 Punkte' : 'Falsch!');
  };

  return (
    <div>
      <h2>Puzzle {id} lösen</h2>
      <input value={solution} onChange={e => setSolution(e.target.value)} placeholder="Lösung eingeben" />
      <button onClick={handleSolve}>Einreichen</button>
      <p>{result}</p>
    </div>
  );
};

export default PuzzleSolver;