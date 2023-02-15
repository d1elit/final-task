import './App.scss';
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Session from './components/Session/Session';

function App() {
  return (
    <BrowserRouter>
      <Session>
        <Routes>
          <Route path="/speedmatch" element={<SpeedMatch />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Session>
    </BrowserRouter>
  );
}

export default App;
