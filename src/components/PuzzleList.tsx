import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPuzzles, createPuzzle } from '../services/dbService';

interface Puzzle {
  _id: string;
  title: string;
  createdAt: Date;
}

const PuzzleList: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [newPuzzleTitle, setNewPuzzleTitle] = useState('');

  useEffect(() => {
    const fetchPuzzles = async () => {
      const puzzleList = await getPuzzles();
      setPuzzles(puzzleList);
    };
    fetchPuzzles();
  }, []);

  const handleCreatePuzzle = async () => {
    if (newPuzzleTitle) {
      const newPuzzle = await createPuzzle(newPuzzleTitle);
      setPuzzles([...puzzles, newPuzzle]);
      setNewPuzzleTitle('');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={newPuzzleTitle}
          onChange={(e) => setNewPuzzleTitle(e.target.value)}
          placeholder="Titel für neues Puzzle eingeben"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleCreatePuzzle}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Puzzle erstellen
        </button>
      </div>
      <ul className="space-y-2">
        {puzzles.map((puzzle) => (
          <li key={puzzle._id}>
            <Link to={`/puzzle/${puzzle._id}`} className="text-blue-500 hover:underline">
              {puzzle.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PuzzleList;