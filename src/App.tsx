import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import PuzzleList from './components/PuzzleList';
    import PuzzleSolver from './components/PuzzleSolver';

    const App = () => {
      return (
        <Router>
          <div className="App">
            <h1>Code-Puzzle-Plattform</h1>
            <Routes>
              <Route path="/" element={<PuzzleList />} />
              <Route path="/puzzle/:id" element={<PuzzleSolver />} />
            </Routes>
          </div>
        </Router>
      );
    };

    export default App;