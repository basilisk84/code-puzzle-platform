import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { runCode } from '../services/sandboxService';
import { analyzeCode } from '../services/aiService';
import { addPoints } from '../services/dbService';

interface CodeEditorProps {
  puzzleId: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ puzzleId }) => {
  const [code, setCode] = useState('// Schreibe deine Lösung hier\nconsole.log("Hallo, Puzzle!");');
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(`puzzle-${puzzleId}`, ydoc);
  const yText = ydoc.getText('code');

  useEffect(() => {
    yText.observe(() => setCode(yText.toString()));
    yText.insert(0, code);
    return () => provider.destroy();
  }, []);

  const handleCodeChange = (value: string | undefined) => {
    if (value) {
      yText.delete(0, yText.length);
      yText.insert(0, value);
    }
  };

  const executeCode = async () => {
    const result = await runCode(code);
    alert(result);
  };

  const analyze = async () => {
    const analysis = await analyzeCode(code);
    alert(analysis);
  };

  const solvePuzzle = async () => {
    const points = await addPoints('user1', 10);
    alert(`Puzzle gelöst! 10 Punkte erhalten. Gesamt: ${points}`);
  };

  const buyPremiumPuzzle = async () => {
    const points = await addPoints('user1', -50);
    if (points >= 0) alert('Premium-Puzzle freigeschaltet!');
    else alert('Nicht genug Punkte!');
  };

  return (
    <div className="border rounded p-4 bg-white shadow">
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={code}
        onChange={handleCodeChange}
      />
      <div className="mt-2 flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={executeCode}
        >
          Code ausführen
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={analyze}
        >
          Code analysieren
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={solvePuzzle}
        >
          Puzzle lösen (+10 Punkte)
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={buyPremiumPuzzle}
        >
          Premium-Puzzle freischalten (50 Punkte)
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;