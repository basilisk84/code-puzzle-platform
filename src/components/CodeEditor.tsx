import { useState } from 'react';
    import MonacoEditor from '@monaco-editor/react';
    import { addPoints } from '../services/dbService';

    const CodeEditor = () => {
      const [code, setCode] = useState('// Schreibe deinen Code hier');
      const [output, setOutput] = useState('');

      const handleRunCode = async () => {
        try {
          const result = eval(code); // Vorsicht: Nur für Demo, nicht sicher!
          setOutput(`Ausgabe: ${result}`);
          await addPoints(10);
        } catch (error: unknown) {
          setOutput(`Fehler: ${(error as Error).message || 'Unbekannter Fehler'}`);
          await addPoints(-50);
        }
      };

      return (
        <div>
          <MonacoEditor
            height="400px"
            language="javascript"
            value={code}
            onChange={(value: string | undefined) => setCode(value || '')}
          />
          <button onClick={handleRunCode}>Code ausführen</button>
          <p>{output}</p>
        </div>
      );
    };

    export default CodeEditor;