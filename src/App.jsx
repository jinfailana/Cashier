// App.jsx or your router configuration file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pickup from './Pages/Pickup';
import History from './Pages/History';
import Pos from './Pages/Pos';
// ... other imports

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pos" element={<Pos />} />
        <Route path="/pickup" element={<Pickup />} />
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Pos />} />
        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;