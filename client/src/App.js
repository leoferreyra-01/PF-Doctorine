import s from './App.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './views/dentist/Home/Home';
import SearchComponent from './views/dentist/SearchComponent/SearchComponent';
import RegisterClinicalHistory from './views/dentist/clinic-history/create/Create';
import PatientDetails from './views/dentist/PatientDetails/PatientDetails';
import RegisterDoctor from './views/dentist/RegisterDoctor/RegisterDoctor';
import PatientHome from './views/patient/home';
import RegisterPatient from './views/dentist/RegisterPatient';
import Calendar from './views/dentist/calendar';
import Budget from './views/dentist/budget';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NewPassword from './components/NewPassword/NewPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
function App() {
  const homeToShow = useSelector(state => state.homeToShow);
  return (
    <div className={s.global_container}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/newPassword" element={<NewPassword />} />
        {homeToShow === 'medic' ? (
          <Route path="/home" element={<Home />}>
            <Route path="/home/" element={<SearchComponent />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="register" element={<RegisterPatient />} />
            <Route path=":patientID" element={<PatientDetails />} />
            <Route
              path="create-clinical-history"
              element={<RegisterClinicalHistory />}
            />
            <Route path="doctor" element={<RegisterDoctor />} />
          </Route>
        ) : (
          <Route path="/home" element={<PatientHome />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
