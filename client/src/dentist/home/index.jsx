import React from 'react';
import NavBar from './navbar';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Grid container>
      {/* BOTON TEMPORAL */}
      <Link to='/clinical-history'>
        <button>VER HC</button>
      </Link>
            
      <NavBar />
    </Grid>
  );
}
