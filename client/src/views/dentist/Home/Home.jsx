import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getClinic } from '../../../redux/actions';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { Toaster } from 'react-hot-toast';
import Loader from '../../../Components/Loader/loader';

export default function Home() {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const clinic = useSelector(state => state.clinic);
  const filledClinic = !!Object.keys(clinic).length;
  const createClinic = useSelector(state => state.createClinic);
  if (createClinic) navigate('/home/clinic-details/initial-config');

  useEffect(() => {
    let parsedTitle = location.pathname.replace(/\W/g, ' ');

    if (parsedTitle.length > 19) parsedTitle = parsedTitle.slice(19);
    if (parsedTitle.length > 18) parsedTitle = parsedTitle.slice(18);
    if (parsedTitle.length > 5) parsedTitle = parsedTitle.slice(5);
    if (parsedTitle === 'ate data') parsedTitle = 'Update Clinic Data';
    if (parsedTitle === 's' && location.pathname === '/home/infoTreatments') {
      parsedTitle = 'Info Treatments';
    }
    if (parsedTitle === 's') parsedTitle = 'Clinic Details';
    if (parsedTitle === 'tial config') parsedTitle = 'Clinic Inital Config';
    if (location.pathname.includes('/home/updateBudget/')) {
      parsedTitle = `Budget ${location.pathname.slice(19)}`;
    }
    if (
      location.pathname.includes('/home/') &&
      (parsedTitle.length === 2 || parsedTitle.length === 3)
    ) {
      parsedTitle = `Patient ${parsedTitle}`;
    }
    if (
      location.pathname.includes('/home/addEvolution/') &&
      parsedTitle.length === 1
    ) {
      parsedTitle = `Add Evolution to Patient ${parsedTitle}`;
    }
    if (parsedTitle === 'story ') {
      parsedTitle = `New Patient Clinical History`;
    }
    if (parsedTitle === 'd' && location.pathname === '/home/changePassword') {
      parsedTitle = 'Change Password';
    }
    setTitle(parsedTitle);
  }, [location]);

  useEffect(() => {
    if (!filledClinic) dispatch(getClinic());
  }, []);
  return (
    <div>
      {loader === true ? (
        <Loader setLoader={setLoader} />
      ) : (
        <div className={s.home_container}>
          <Header title={title} />
          <SideBar />
          <Outlet />
        </div>
      )}
    </div>
  );
}
