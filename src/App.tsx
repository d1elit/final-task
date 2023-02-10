import React from 'react';
import logo from './logo.svg';
import './App.scss';
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/speedmatch" element={<SpeedMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
