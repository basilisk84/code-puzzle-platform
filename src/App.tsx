import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PuzzleList from './components/PuzzleList';
import PuzzleSolver from './components/PuzzleSolver';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PuzzleList />} />
        <Route path="/puzzle/:id" element={<PuzzleSolver />} />
      </Routes>
    </Router>
  );
};

export default App;