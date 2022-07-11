import './App.css';

import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokeId" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
