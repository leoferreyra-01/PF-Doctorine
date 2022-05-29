import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import NavBar from './navbar';
import Grid from '@mui/material/Grid';
import Header from './Header/Header';
import { Toaster } from 'react-hot-toast';
import Loader from './Loader/loader';
export default function Home() {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    let parsedTitle = location.pathname.replace(/\W/g, ' ');
    if (parsedTitle.length > 5) parsedTitle = parsedTitle.slice(5);
    setTitle(parsedTitle);
  }, [location]);

  return (
    <div>
      {loader === true ? (
        <Loader setLoader={setLoader} />
      ) : (
        <div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ className: '', duration: 7000 }}
          />
          {/* BOTON TEMPORAL */}
          {/* <Link to="/clinical-history">
        <button>VER HC</button>
      </Link> */}

          <NavBar />
          <Header title={title} />
          <Outlet />
        </div>
      )}
    </div>
  );
}
