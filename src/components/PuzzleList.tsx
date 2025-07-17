import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPuzzles, createPuzzle, addPoints } from '../services/dbService';

const PuzzleList = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [newPuzzleTitle, setNewPuzzleTitle] = useState('');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    getPuzzles().then(setPuzzles);
    addPoints('user1', 0).then(setPoints);
  }, []);

  const handleCreatePuzzle = () => {
    if (newPuzzleTitle) {
      createPuzzle(newPuzzleTitle).then(newPuzzle => {
        setPuzzles([...puzzles, newPuzzle]);
        setNewPuzzleTitle('');
        addPoints('user1', 10).then(setPoints);
      });
    }
  };

  return (
    <div>
      <div>
        <h2>Punkte: {points}</h2>
        <input value={newPuzzleTitle} onChange={e => setNewPuzzleTitle(e.target.value)} placeholder="Titel eingeben" />
        <button onClick={handleCreatePuzzle}>Puzzle erstellen</button>
      </div>
      <ul>{puzzles.map(puzzle => <li key={puzzle._id}><Link to={`/puzzle/${puzzle._id}`}>{puzzle.title}</Link></li>)}</ul>
    </div>
  );
};

export default PuzzleList;