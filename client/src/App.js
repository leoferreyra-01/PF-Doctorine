import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './landingPage';
import Home from './dentist/home';
import RegisterPatient from './dentist/home/navbar/register patient/';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <LandingPage />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/createPatient" render={() => <RegisterPatient />} />
    </div>
  );
}

// linea 9: del odontologo

export default App;
