import React from 'react';
import NavBar from './navbar';
import Grid from '@mui/material/Grid';
import Budget from '../home/budget/index';

export default function Home() {
  return (
    <Grid container>
      <NavBar />
      <Budget />
    </Grid>
  );
}
