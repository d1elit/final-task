import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './pages/Login';
import MemoryMatch from './Games/GameMemoryMatch/MemoryMatch';
import MemoryMatrix from './Games/GameMatrix/MemoryMatrix/MemoryMatrix';
import RotationMatrix from './Games/GameMatrix/RotationMatrix/RotationMatrix';
import Session from './components/Session/Session';
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch';
import Stats from './pages/Stats';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import './App.scss';

function App() {
  return (
    <Suspense fallback={''}>
      <BrowserRouter>
        <Session>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/speedmatch" element={<SpeedMatch />} />
            <Route path="/memorymatch" element={<MemoryMatch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/memorymatrix" element={<MemoryMatrix />} />
            <Route path="/rotationmatrix" element={<RotationMatrix />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </Session>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
