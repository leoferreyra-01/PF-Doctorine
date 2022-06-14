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
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ className: '', duration: 7000 }}
          />
          <Header title={title} />
          <SideBar />
          <Outlet />
        </div>
      )}
    </div>
  );
}
