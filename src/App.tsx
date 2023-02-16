import React from 'react';
import './App.scss';
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/speedmatch" element={<SpeedMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
