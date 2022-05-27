import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './navbar';
import Grid from '@mui/material/Grid';
import Header from './Header/Header';
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let parsedTitle = location.pathname.replace(/\W/g, ' ');
    if (parsedTitle.length > 5) parsedTitle = parsedTitle.slice(5);
    setTitle(parsedTitle);
  }, [location]);

  return (
    <Grid container>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <Header title={title} />
      <Outlet />
    </Grid>
  );
}
