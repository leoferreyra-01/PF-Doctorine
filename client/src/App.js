import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./landingPage";
import Home from "./dentist/home";
import RegisterPatient from "./dentist/home/navbar/register patient/";
import Calendar from "./dentist/home/calendar";
import Budget from "./dentist/home/budget";
import PatientHome from "./patient/home";
////LOGIN
import SignUp from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import PasswordReset from "./Components/PasswordReset/PasswordReset.jsx";
import NewPassword from "./Components/NewPassword/NewPassword";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <LandingPage />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/createPatient" render={() => <RegisterPatient />} />
      <Route path="/home/calendar" render={() => <Calendar />} />
      <Route path="/home/budget" render={() => <Budget />} />
      <Route path="/patient-home" render={() => <PatientHome />} />
      {/* RUTAS LOGIN */}
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/passwordReset" element={<PasswordReset />} />
      <Route path="/newPassword" element={<NewPassword />} />
    </div>
  );
}

// path Home: del odontologo

export default App;
