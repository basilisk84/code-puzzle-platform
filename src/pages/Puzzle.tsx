import { useParams } from 'react-router-dom';
     import CodeEditor from '../components/CodeEditor';

     const Puzzle = () => {
       const { id } = useParams<{ id?: string }>();

       return (
         <div>
           <h1>Puzzle {id}</h1>
           <CodeEditor />
         </div>
       );
     };

     export default Puzzle;