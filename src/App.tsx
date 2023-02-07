import React from 'react'
import logo from './logo.svg'
import './App.scss'
import SpeedMatch from './Games/GameSpeedMatch/SpeedMatch'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  console.log('APP RENDERING')
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/speedmatch' element={<SpeedMatch/>}/>
        {/* <Route path='/' element={<SpeedMatch/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
