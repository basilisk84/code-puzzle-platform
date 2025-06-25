import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PuzzleSolver: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');

  const handleSolve = () => {
    // Einfache Logik: Wenn "test" eingegeben wird, erfolgreich
    if (solution.toLowerCase() === 'test') {
      setResult('Lösung korrekt! +20 Punkte.');
    } else {
      setResult('Falsch, versuche es erneut.');
    }
  };

  return (
    <div>
      <h2>Puzzle {id} lösen</h2>
      <input
        type="text"
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
        placeholder="Lösung eingeben"
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleSolve}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Einreichen
      </button>
      <p>{result}</p>
    </div>
  );
};

export default PuzzleSolver;