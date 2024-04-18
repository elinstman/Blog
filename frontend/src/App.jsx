import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import './App.css'

function App() {

  return (
    <>
     <h1>
        TEST
      </h1>
    <Routes >
      <Route path='/' element={<HomePage />}/>
    </Routes>
    </>
  )
}

export default App
