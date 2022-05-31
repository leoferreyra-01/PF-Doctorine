import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { Toaster } from 'react-hot-toast';
import Loader from '../../../Components/Loader/loader';

export default function Home() {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    let parsedTitle = location.pathname.replace(/\W/g, ' ');
    if (parsedTitle.length > 18) parsedTitle = parsedTitle.slice(18);
    if (parsedTitle.length > 5) parsedTitle = parsedTitle.slice(5);
    setTitle(parsedTitle);
  }, [location]);
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
