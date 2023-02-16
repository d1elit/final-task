import './App.scss';
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Session from './components/Session/Session';
import MemoryMatrix from './Games/MemoryMatrix/MemoryMatrix';
import { Link } from 'react-router-dom';
import MemoryMatch from './Games/GameMemoryMatch/MemoryMatch';

function App() {
  return (
    <BrowserRouter>
      <Session>
        <div>
          <Link to="/" style={{ color: 'white' }}>
            Link - /
          </Link>
        </div>
        <div>
          <Link to="/speedmatch" style={{ color: 'white' }}>
            Link - /speedmatch
          </Link>
        </div>
        <div>
          <Link to="/memorymatch" style={{ color: 'white' }}>
            Link - /memorymatch
          </Link>
        </div>
        <div>
          <Link to="/memorymatrix" style={{ color: 'white' }}>
            Link - /memorymatrix
          </Link>
        </div>
        <div>
          <Link to="/login" style={{ color: 'white' }}>
            Link - /login
          </Link>
        </div>
        <div>
          <button onClick={() => localStorage.setItem('lang', 'eng')}>
            Eng
          </button>
          <button onClick={() => localStorage.setItem('lang', 'rus')}>
            Rus
          </button>
        </div>

        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/speedmatch" element={<SpeedMatch />} />
          <Route path="/memorymatch" element={<MemoryMatch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/memorymatrix" element={<MemoryMatrix />} />
          <Route path="*" element={<div>Home</div>} />
        </Routes>
      </Session>
    </BrowserRouter>
  );
}

export default App;
