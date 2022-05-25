import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingPage from './landingPage';
import Home from './dentist/home';
import RegisterPatient from './dentist/home/navbar/register patient/';
import Calendar from './dentist/home/calendar';
import Budget from './dentist/home/budget';
import PatientHome from './patient/home';

function App() {
  console.log('renderice app');
  const homeToShow = useSelector(state => state.homeToShow);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {homeToShow === 'medic' ? (
          <Route path="/home" element={<Home />}>
            <Route path="calendar" element={<Calendar />} />
            <Route path="budget" element={<Budget />} />
            <Route path="register" element={<RegisterPatient />} />
          </Route>
        ) : (
          <Route path="/home" element={<PatientHome />} />
        )}
      </Routes>
    </div>
  );
}

// path Home: del odontologo

export default App;
