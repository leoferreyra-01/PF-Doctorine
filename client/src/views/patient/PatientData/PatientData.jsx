import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { postClinic } from '../../../redux/actions';
// import s from './PatientData.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PatientSchema } from './PatientSchema';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
// import { Button } from '@material-ui/core';
import Input from '@mui/material/Input';
import Grid from '@material-ui/core/Grid';
// import Avatar from '@mui/material/Avatar';
import { getPatientDni2 } from '../../../redux/actions';

const PatientData = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const user = {};
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));

  useEffect(() => {
    if (!SearchedPatient.medicalService) {
      dispatch(getPatientDni2(uno.document));
      // recargar()
    }
  }, [dispatch]);

  const Styles1 = {
    wrapper: {
      // width: '100%',
      display: 'flex',
      // flexDirection: 'column',
      // backgroundColor: '#009be5',
      padding: '20px',
      flexGrow: 1,
      // marginLeft: '320px'
    },
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PatientSchema),
  });
  const onSubmit = data => {
    // for (const [key, value] of Object.entries(data)) {
    //   if (key.includes('user')) {
    //     user[key] = value;
    //   } else if (key.includes('clinic')) {
    //     clinic[key] = value;
    //   } else if (key.includes('doctor')) {
    //     doctor[key] = value;
    //   }
    // }
    // user.userType = 'Medic';
    // console.log(user);
    // console.log(clinic);
    // console.log(doctor);
    // dispatch(postClinic(clinic));
    reset();
  };
  return (
    <div className="container">
      <Container style={{ marginLeft: '2px', width: 'inherit' }}>
        <Grid sx={Styles1.wrapper} container item xs spacing={2}></Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              border: 'solid black',
              padding: '10px',
              borderWidth: 'thin',
              borderRadius: '5px',
              borderColor: '#009be5',
              marginBottom: '12px',
              marginTop: '20px',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>Personal information</h2>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={2}>
                <TextField
                  label="Document"
                  fullWidth
                  value={SearchedPatient.document}
                  focused
                  // disable='true'
                  required
                  variant="filled"
                  margin="normal"
                  {...register('userDocument')}
                  error={!!errors.userDocument}
                  helperText={
                    errors.userDocument ? errors.userDocument.message : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Name"
                  fullWidth
                  value={SearchedPatient.name}
                  focused
                  // enable='true'
                  required
                  variant="filled"
                  margin="normal"
                  {...register('userName')}
                  error={!!errors.userName}
                  helperText={errors.userName ? errors.userName.message : null}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="LastName"
                  fullWidth
                  value={SearchedPatient.lastName}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userLastName')}
                  error={!!errors.userLastName}
                  helperText={
                    errors.userLastName ? errors.userLastName.message : null
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  type="date"
                  label="Birthday"
                  fullWidth
                  value={SearchedPatient.birth}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userBirthDay')}
                />
              </Grid>
            </Grid>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={3}>
                <TextField
                  label="Street"
                  fullWidth
                  value={SearchedPatient.street}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userStreet')}
                  error={!!errors.userStreet}
                  helperText={
                    errors.userStreet ? errors.userStreet.message : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Number"
                  fullWidth
                  value={SearchedPatient.number}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userNumber')}
                  error={!!errors.userNumber}
                  helperText={
                    errors.userNumber ? errors.userNumber.message : null
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="City"
                  fullWidth
                  value={SearchedPatient.city}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userCity')}
                  error={!!errors.userCity}
                  helperText={errors.userCity ? errors.userCity.message : null}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Postal Code"
                  fullWidth
                  value={SearchedPatient.postalCode}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userPostalCode')}
                  error={!!errors.userPostalCode}
                  helperText={
                    errors.userPostalCode ? errors.userPostalCode.message : null
                  }
                />
              </Grid>
            </Grid>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={3}>
                <TextField
                  label="Telephone"
                  fullWidth
                  value={SearchedPatient.telephone}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userTelephone')}
                  error={!!errors.userTelephone}
                  helperText={
                    errors.userTelephone ? errors.userTelephone.message : null
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Cellphone"
                  fullWidth
                  value={SearchedPatient.cellphone}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userCellphone')}
                  error={!!errors.userCellphone}
                  helperText={
                    errors.userCellphone ? errors.userCellphone.message : null
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Email"
                  fullWidth
                  value={SearchedPatient.email}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userEmail')}
                  error={!!errors.userEmail}
                  helperText={
                    errors.userEmail ? errors.userEmail.message : null
                  }
                />
              </Grid>
              {/* <Grid item xs={3}>
                  <TextField
                    label="Password"
                    fullWidth
                  value={SearchedPatient.password}
                  focused
                  variant="filled"
                  margin="normal"
                  {...register('userPassword')}
                  error={!!errors.userPassword}
                  helperText={
                    errors.userPassword ? errors.userPassword.message : null
                  }
                />
              </Grid> */}
            </Grid>
          </div>
          {/* <Button type="submit" variant="contained" color="primary" fullWidth> */}
          {/* Enviar */}
          {/* </Button> */}
        </form>
      </Container>
    </div>
  );
};

export default PatientData;
