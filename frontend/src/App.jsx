import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import LogoutPage from './Pages/LogoutPage';
import './App.css'
import { AuthProvider } from './Context/auth.context';
import CreatepostPage from './Pages/CreatepostPage';
import EditPost from './Components/EditPost';

function App() {

  return (
    <>
    <AuthProvider> 
    <Routes >
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/logout' element={<LogoutPage />} />
      <Route path='/createpost' element={<CreatepostPage />} />
      <Route path='/edit/:id' element={<EditPost />} />
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
