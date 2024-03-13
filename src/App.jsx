import LandingPage from './components/LandingPage'
import LoginPage from './components/form/LoginPage'
import SignupPage from './components/form/SignupPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return ( 
    <Router>
      <Routes>
      <Route exact path='/' element={<LandingPage />}/><Route/>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
