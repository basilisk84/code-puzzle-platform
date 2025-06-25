import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPuzzles, createPuzzle, addPoints } from '../services/dbService';

interface Puzzle {
  _id: string;
  title: string;
  createdAt: Date;
}

const PuzzleList: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [newPuzzleTitle, setNewPuzzleTitle] = useState('');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPuzzles = async () => {
      const puzzleList = await getPuzzles();
      setPuzzles(puzzleList);
      // Simuliere Punkte für den Benutzer
      const userPoints = await addPoints('user1', 0); // Initialer Abruf
      setPoints(userPoints);
    };
    fetchPuzzles();
  }, []);

  const handleCreatePuzzle = async () => {
    if (newPuzzleTitle) {
      const newPuzzle = await createPuzzle(newPuzzleTitle);
      setPuzzles([...puzzles, newPuzzle]);
      setNewPuzzleTitle('');
      // Vergib Punkte für das Erstellen eines Puzzles
      const newPoints = await addPoints('user1', 10);
      setPoints(newPoints);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2>Punkte: {points}</h2>
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
          Puzzle erstellen (+10 Punkte)
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