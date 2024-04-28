import React, { useEffect } from 'react'
import LandingPage from './components/LandingPage'
import LoginPage from './components/form/LoginPage'
import SignupPage from './components/form/SignupPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ForgetPasswordPage from './components/form/ForgetPasswordPage'
import VerificationPage from './components/form/VerificationPage'
import ForumPage from './components/ForumPage'
//import Routes from '../Backend/server.cjs'
import { useCookies } from 'react-cookie'

function App() {
  return ( 
    <Router>
      <Routes>
      <Route exact path='/' element={<LandingPage />}/><Route/>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
      <Route path='/forget-password' element={<ForgetPasswordPage />}></Route>
      <Route path='/verify' element={<VerificationPage />}></Route>
      <Route path='/forum' element={<ForumPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
