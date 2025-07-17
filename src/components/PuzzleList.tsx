import { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import { getPuzzles, createPuzzle, addPoints } from '../services/dbService';

    interface Puzzle {
      _id: string;
      title: string;
      createdAt: Date;
    }

    const PuzzleList = () => {
      const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
      const [newPuzzleTitle, setNewPuzzleTitle] = useState('');
      const [points, setPoints] = useState<number>(() => {
        const savedPoints = localStorage.getItem('userPoints');
        return savedPoints ? parseInt(savedPoints, 10) : 0;
      });

      useEffect(() => {
        const fetchData = async () => {
          const puzzleList = await getPuzzles() || [];
          setPuzzles(puzzleList);
          const userPoints = await addPoints('user1', points) || points;
          setPoints(userPoints);
          localStorage.setItem('userPoints', userPoints.toString());
        };
        fetchData();
      }, [points]);

      const handleCreatePuzzle = async () => {
        if (newPuzzleTitle.trim()) {
          const newPuzzle = await createPuzzle(newPuzzleTitle);
          if (newPuzzle) {
            setPuzzles([...puzzles, newPuzzle]);
            setNewPuzzleTitle('');
            const newPoints = await addPoints('user1', points + 10) || points + 10;
            setPoints(newPoints);
            localStorage.setItem('userPoints', newPoints.toString());
          }
        }
      };

      return (
        <div>
          <div>
            <h2>Punkte: {points}</h2>
            <input
              value={newPuzzleTitle}
              onChange={(e) => setNewPuzzleTitle(e.target.value)}
              placeholder="Titel eingeben"
            />
            <button onClick={handleCreatePuzzle}>Puzzle erstellen</button>
          </div>
          <ul>
            {puzzles.map((puzzle) => (
              <li key={puzzle._id}>
                <Link to={`/puzzle/${puzzle._id}`}>{puzzle.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default PuzzleList;