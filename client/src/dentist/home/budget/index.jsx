import React from 'react';
import Grid from '@mui/material/Grid';
import CommonButton from '../../../common/CommonButton/CommonButton';

export default function Landing() {
  const buttonStyles = {
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: 2.5,
    '&.MuiButton-contained': {
      backgroundColor: '#009be5',
      '&:hover': {
        backgroundColor: '#006db3',
      },
    },
    '&.MuiButton-outlined': {
      color: '#fff',
      borderColor: '#fff',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  };
  return (
    <Grid item xs={8}>
      BUDGET
      <CommonButton sx={buttonStyles} variant="contained">
        Add user
      </CommonButton>
      <CommonButton sx={buttonStyles} variant="" color="secondary">
        Add user
      </CommonButton>
      <CommonButton variant="contained" color="primary">
        Primary
      </CommonButton>
    </Grid>
  );
}
