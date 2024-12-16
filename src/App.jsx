import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import History from './Pages/History';
import Pos from './Pages/Pos';
import Pickup from './Pages/Pickup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/pickup" element={<Pickup />} />
        {/* Set POS as the default route */}
        <Route path="/" element={<Pos />} />
      </Routes>
    </Router>
  );
}

export default App;