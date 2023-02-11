import React from 'react';
import logo from './logo.svg';
import './App.scss';
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemoryMatch from './Games/GameMemoryMatch/MemoryMatch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/speedmatch" element={<SpeedMatch />} />
        <Route path="/memorymatch" element={<MemoryMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
