import React from 'react';
import { useDispatch } from 'react-redux';
import { postClinic } from '../../../redux/actions';
import s from './RegisterDoctor.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DoctorSchema } from './DoctorSchema';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Input from '@mui/material/Input';
import Grid from '@material-ui/core/Grid';
import Avatar from '@mui/material/Avatar';

const RegisterDoctor = () => {
  const dispatch = useDispatch();
  const user = {};
  const clinic = {};
  const doctor = {};

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
    resolver: yupResolver(DoctorSchema),
  });

  const onSubmit = data => {
    for (const [key, value] of Object.entries(data)) {
      if (key.includes('user')) {
        user[key] = value;
      } else if (key.includes('clinic')) {
        clinic[key] = value;
      } else if (key.includes('doctor')) {
        doctor[key] = value;
      }
    }
    user.userType = 'Medic';
    console.log(user);
    console.log(clinic);
    console.log(doctor);
    dispatch(postClinic(clinic));
    reset();
  };

  return (
    <div className={s.container}>
      <Container style={{ marginLeft: '322px', width: 'inherit' }}>
        <Grid sx={Styles1.wrapper} container item xs spacing={2}>
          <Grid item xs={2}>
            <Avatar src="https://i.gyazo.com/91c25cfe3cba6768abc0f2153ce58538.png" />
          </Grid>
          <Grid item xs={8}>
            <h2 style={{ marginBottom: '40px' }}>Medical record</h2>
          </Grid>
        </Grid>
        {/* <Grid item xs={3}>
        <Input
                  type="file"
                  label='Birthday'
                  fullWidth
                  variant="filled"
                  margin="dense"
                  {...register('userBirthDay')}
                />
          <TextField
            label="Profile Image"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('userImgProfile')}
            error={!!errors.userImgProfile}
            helperText={errors.userImgProfile ? errors.userImgProfile.message : null}
          />
        </Grid> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              border: 'solid black',
              padding: '10px',
              borderWidth: 'thin',
              borderRadius: '5px',
              borderColor: '#009be5',
              marginBottom: '12px',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>Personal information</h2>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={2}>
                <TextField
                  label="Document"
                  fullWidth
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
                  variant="filled"
                  margin="normal"
                  {...register('userEmail')}
                  error={!!errors.userEmail}
                  helperText={
                    errors.userEmail ? errors.userEmail.message : null
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Password"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('userPassword')}
                  error={!!errors.userPassword}
                  helperText={
                    errors.userPassword ? errors.userPassword.message : null
                  }
                />
              </Grid>
            </Grid>
          </div>
          <div
            style={{
              border: 'solid black',
              padding: '10px',
              borderWidth: 'thin',
              borderRadius: '5px',
              borderColor: '#009be5',
              marginBottom: '12px',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>Specialization data</h2>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Title"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('doctorTitle')}
                  error={!!errors.doctorTitle}
                  helperText={
                    errors.doctorTitle ? errors.doctorTitle.message : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Specialization"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('doctorSpecialization')}
                  error={!!errors.doctorSpecialization}
                  helperText={
                    errors.doctorSpecialization
                      ? errors.doctorSpecialization.message
                      : null
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  type="date"
                  lang="Tuition Date"
                  fullWidth
                  variant="filled"
                  margin="dense"
                  {...register('doctorTuitionDate')}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Tuition Number"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('doctorTuitionNumber')}
                  error={!!errors.doctorTuitionNumber}
                  helperText={
                    errors.doctorTuitionNumber
                      ? errors.doctorTuitionNumber.message
                      : null
                  }
                />
              </Grid>
            </Grid>
          </div>
          <div
            style={{
              border: 'solid black',
              padding: '10px',
              borderWidth: 'thin',
              borderRadius: '5px',
              borderColor: '#009be5',
              marginBottom: '12px',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>Clinic information</h2>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={2}>
                <TextField
                  label="Clinic Logo"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicLogo')}
                  error={!!errors.clinicLogo}
                  helperText={
                    errors.clinicLogo ? errors.clinicLogo.message : null
                  }
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label="Clinic Name"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicName')}
                  error={!!errors.clinicName}
                  helperText={
                    errors.clinicName ? errors.clinicName.message : null
                  }
                />
              </Grid>
            </Grid>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={3}>
                <TextField
                  label="Clinic Street"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicStreet')}
                  error={!!errors.clinicStreet}
                  helperText={
                    errors.clinicStreet ? errors.clinicStreet.message : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Clinic Number"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicNumber')}
                  error={!!errors.clinicNumber}
                  helperText={
                    errors.clinicNumber ? errors.clinicNumber.message : null
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Clinic City"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicCity')}
                  error={!!errors.clinicCity}
                  helperText={
                    errors.clinicCity ? errors.clinicCity.message : null
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Clinic Postal Code"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicPostalCode')}
                  error={!!errors.clinicPostalCode}
                  helperText={
                    errors.clinicPostalCode
                      ? errors.clinicPostalCode.message
                      : null
                  }
                />
              </Grid>
            </Grid>
            <Grid sx={Styles1.wrapper} container item xs spacing={2}>
              <Grid item xs={3}>
                <TextField
                  label="Clinic Telephone"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicTelephone')}
                  error={!!errors.clinicTelephone}
                  helperText={
                    errors.clinicTelephone
                      ? errors.clinicTelephone.message
                      : null
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Clinic Email"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicEmail')}
                  error={!!errors.clinicEmail}
                  helperText={
                    errors.clinicEmail ? errors.clinicEmail.message : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Clinic Hours"
                  fullWidth
                  variant="filled"
                  margin="normal"
                  {...register('clinicHours')}
                  error={!!errors.clinicHours}
                  helperText={
                    errors.clinicHours ? errors.clinicHours.message : null
                  }
                />
              </Grid>
            </Grid>
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default RegisterDoctor;
