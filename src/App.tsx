import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import SpeedMatch from "./Games/GameSpeedMatch/SpeedMatch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Session from "./components/Session/Session";

function App() {
  return (
    <Session>
      <BrowserRouter>
        <Routes>
          <Route path="/speedmatch" element={<SpeedMatch />} />
          {/* <Route path='/' element={<SpeedMatch/>}/> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Session>
  );
}

export default App;
