import { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import { addPoints } from '../services/dbService';

    const PuzzleSolver = () => {
      const { id } = useParams();
      const [solution, setSolution] = useState('');
      const [result, setResult] = useState('');
      const [points, setPoints] = useState<number>(() => {
        const savedPoints = localStorage.getItem('userPoints');
        return savedPoints ? parseInt(savedPoints, 10) : 0;
      });
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        localStorage.setItem('userPoints', points.toString());
      }, [points]);

      const handleSolve = async () => {
        try {
          if (solution.toLowerCase() === 'test') {
            const newPoints = await addPoints(points + 20) || points + 20;
            setPoints(newPoints);
            setResult('Richtig! +20 Punkte');
            localStorage.setItem('userPoints', newPoints.toString());
            setError(null);
          } else {
            setResult('Falsch!');
          }
        } catch (err) {
          setError('Fehler beim Einreichen der Lösung.');
          console.error('Solve-Fehler:', err);
        }
      };

      return (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h2>Puzzle {id} lösen</h2>
          <input
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Lösung eingeben"
          />
          <button onClick={handleSolve}>Einreichen</button>
          <p>{result}</p>
          <p>Punkte: {points}</p>
        </div>
      );
    };

    export default PuzzleSolver;