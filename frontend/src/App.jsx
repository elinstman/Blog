import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import './App.css'
import { AuthProvider } from './Context/auth.context';

function App() {

  return (
    <>
    <AuthProvider> 
    <Routes >
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
