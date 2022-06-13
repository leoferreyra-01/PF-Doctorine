import s from './App.module.css';
import React from 'react'; //
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './views/dentist/Home/Home';
import SearchComponent from './views/dentist/SearchComponent/SearchComponent';
import RegisterClinicalHistory from './views/dentist/clinic-history/create/Create';
import PatientDetails from './views/dentist/PatientDetails/PatientDetails';
import RegisterDoctor from './views/dentist/RegisterDoctor/RegisterDoctor';
import RegisterPatient from './views/dentist/RegisterPatient';
import UpdatePatient from './views/dentist/UpdatePatient/UpdatePatient.jsx';
import Calendar from './views/dentist/calendar';
import Budgets from './views/dentist/Budgets/Budgets';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import NewPassword from './Components/NewPassword/NewPassword';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import ClinicDetails from './views/dentist/ClinicDetails/ClinicDetails';
import AddEvolution from './views/dentist/AddEvolution/AddEvolution';
import AddStudy from './views/dentist/AddStudies/AddStudies';
import { AddBudget } from './views/dentist/AddBudget/AddBudget';
import FileUpload from './FileUpload/FileUpload';
import SearchPatient from './views/patient/searchPatient/searchPatient';
import PatientHome from './views/patient/PatientHome/PatientHome';
import PatientData from './views/patient/PatientData/PatientData';
import PatientDataUpdate from './views/patient/PatientDataUpdate/PatientDataUpdate';
import CalendarFunction from './views/patient/Calendar/Calendar';
import UpdateMedic from './views/dentist/UpdateMedic/UpdateMedic';
//import BudgetPatient from './views/patient/HeaderPatient/BudgetPatient/BudgetPatient';
import InitialConfig from './views/dentist/ClinicDetails/InitialConfig/InitialConfig';
import UpdateData from './views/dentist/ClinicDetails/UpdateData/UpdateData';
import UpdateBudget from './views/dentist/UpdateBudget/UpdateBudget';
import { home } from './redux/actions';
import BudgetPayment from './views/patient/HeaderPatient/BudgetPatient/BudgetPayment';

function App() {
  const homeToShow = useSelector(state => state.homeToShow);

  return (
    <div className={s.global_container}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/newPassword" element={<NewPassword />} />
        {homeToShow === 'Medic' ? (
          <Route path="/home" element={<Home />}>
            <Route path="/home/" element={<SearchComponent />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="budget" element={<Budgets />} />
            <Route path="register" element={<RegisterPatient />} />
            <Route path=":patientID" element={<PatientDetails />} />
            <Route
              path="/home/addEvolution/:patientID"
              element={<AddEvolution />}
            />
            <Route path="/home/studies/:patientID" element={<AddStudy />} />
            <Route
              path="/home/updatePatient/:patientID"
              element={<UpdatePatient />}
            />
            <Route
              path="create-clinical-history"
              element={<RegisterClinicalHistory />}
            />
            <Route path="doctor" element={<RegisterDoctor />} />
            <Route path="addBudget" element={<AddBudget />} />
            <Route path="updateBudget/:budgetID" element={<UpdateBudget />} />
            <Route path="updateMedic" element={<UpdateMedic />} />
            <Route path="clinic-details" element={<ClinicDetails />} />
            <Route
              path="clinic-details/initial-config"
              element={<InitialConfig />}
            />
            <Route path="clinic-details/update-data" element={<UpdateData />} />
          </Route>
        ) : (
          <Route path="/home" element={<PatientHome />}>
            <Route path="/home/" element={<SearchPatient />} />
            <Route path="data" element={<PatientData />} />
            <Route path="appointment" element={<CalendarFunction />} />
            <Route path="dataUpdate" element={<PatientDataUpdate />} />
            <Route path="payments" element={<BudgetPayment />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
