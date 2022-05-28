import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './navbar';
import Grid from '@mui/material/Grid';
import Header from './Header/Header';
import Loader from '../home/Loader/loader';
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
        <Grid container>
          <NavBar />
          <Header title={title} />
          <Outlet />
        </Grid>
      )}
    </div>
  );
}
