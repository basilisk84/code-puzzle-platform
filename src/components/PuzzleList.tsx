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
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const puzzleList = await getPuzzles() || [];
            setPuzzles(puzzleList);
            const userPoints = await addPoints(points) || points;
            setPoints(userPoints);
            localStorage.setItem('userPoints', userPoints.toString());
            setError(null);
          } catch (err) {
            setError('Fehler beim Laden der Daten. Bitte versuche es später nochmal.');
            console.error('Fetch-Fehler:', err);
          }
        };
        fetchData();
      }, [points]);

      const handleCreatePuzzle = async () => {
        if (newPuzzleTitle.trim()) {
          try {
            const newPuzzle = await createPuzzle(newPuzzleTitle);
            if (newPuzzle) {
              setPuzzles([...puzzles, newPuzzle]);
              setNewPuzzleTitle('');
              const newPoints = await addPoints(points + 10) || points + 10;
              setPoints(newPoints);
              localStorage.setItem('userPoints', newPoints.toString());
              setError(null);
            }
          } catch (err) {
            setError('Fehler beim Erstellen des Puzzles.');
            console.error('Create-Fehler:', err);
          }
        }
      };

      return (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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