import Header from './components/Header/Header';
import Login from './pages/Login';
import MemoryMatrix from './Games/MemoryMatrix/MemoryMatrix';

import Session from './components/Session/Session';
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.scss';
import MemoryMatch from './Games/GameMemoryMatch/MemoryMatch';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={''}>
      <BrowserRouter>
        <Session>
          <Header />
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
    </Suspense>
  );
}

export default App;
