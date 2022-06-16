import React, { useState, useEffect } from 'react';
import './PatientHome.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../HeaderPatient/HeaderPatient';
// import SearchPatient from './views/patient/PatientHome/searchPatient';

import SideBar from '../SideBarPatient/SideBar';
import { Toaster } from 'react-hot-toast';
import Loader from '../../../Components/Loader/loader';
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line
import { getPatientDni2, getTurns } from '../../../redux/actions';

export default function Home() {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  const [loader, setLoader] = useState(true); // eslint-disable-next-line
  const user = useSelector(state => state.user);
  const turns = useSelector(state => state.unavailableTurns);

  const dispatch = useDispatch();
  // const allPatients = useSelector(state => state.allPatients);
  const searchedPatient = useSelector(state => state.searchedPatient);
  // window.localStorage.setItem('user', JSON.stringify(searchedPatient));
  // window.localStorage.setItem('user', searchedPatient);
  // const filledPatients = !!allPatients.length;
  // const title = `Bienvenido(a) ${searchedPatient.name} ${searchedPatient.lastName}`

  console.log(searchedPatient);
  console.log(searchedPatient.name);
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));
  // console.log(window.localStorage.getItem('user'));
  console.log(uno);

  useEffect(() => {
    let parsedTitle = location.pathname.replace(/\W/g, ' ');
    console.log(parsedTitle);
    if (parsedTitle.length > 18) parsedTitle = parsedTitle.slice(18);
    if (parsedTitle.length > 5) parsedTitle = parsedTitle.slice(5);
    setTitle(parsedTitle);
    if (turns.length === 0) dispatch(getTurns());

    // dispatch(getPatientDni2(uno.document));
  }, [location]);

  console.log(title);

  return (
    <div>
      {loader === true ? (
        <Loader setLoader={setLoader} />
      ) : (
        <div className="homeContainer">
          <Header title={title} />
          <SideBar />
          <Outlet />
        </div>
      )}
    </div>
  );
}
