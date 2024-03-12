import { useState } from 'react'
import LandingPage from './components/LandingPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/form/LoginPage';


function App() {

  return (
    <>
    <Router>
      <Switch>
        <Route path='/login' Component={LoginPage} />
      </Switch>
    </Router>
     <LandingPage />
    </>
  )
}

export default App
