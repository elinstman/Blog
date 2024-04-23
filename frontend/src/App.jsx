import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import './App.css'

function App() {

  return (
    <>
    <Routes >
      <Route path='/' element={<HomePage />}/>
    </Routes>
    </>
  )
}

export default App
