import React from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';

const Puzzle: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Puzzle {id}</h2>
      <CodeEditor puzzleId={id || ''} />
    </div>
  );
};

export default Puzzle;