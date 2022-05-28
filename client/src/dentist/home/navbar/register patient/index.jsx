import React from 'react';
import { useDispatch } from 'react-redux';
import { postPatient } from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Input from '@mui/material/Input';
import s from './buton.module.css';
import GridWrapper from '../../../../sharedComponents/GridWrapper/GridWrapper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerPatientSchema } from './registerPatientSchema';
import sendPatientHelper from './sendPatientHelper';

export default function RegisterPatient() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerPatientSchema),
  });
  const onSubmit = data => {
    const patientReady = sendPatientHelper(data);
    console.log(patientReady);
    alert('Sera redireccionado para crear la historia clinica del paciente');
    dispatch(postPatient(patientReady));
    navigate('/home/create-clinical-history');
  };

  return (
    <GridWrapper>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <imput
            label="name"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : null}
          />
          <TextField
            label="lastName"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : null}
          />
          <TextField
            label="document"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('document')}
            error={!!errors.document}
            helperText={errors.document ? errors.document.message : null}
          />
          <TextField
            label="email"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : null}
          />
          <TextField
            label="street"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('street')}
            error={!!errors.street}
            helperText={errors.street ? errors.street.message : null}
          />
          <TextField
            label="number"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('number')}
            error={!!errors.number}
            helperText={errors.number ? errors.number.message : null}
          />
          <TextField
            label="city"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('city')}
            error={!!errors.city}
            helperText={errors.city ? errors.city.message : null}
          />
          <TextField
            label="postalCode"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('postalCode')}
            error={!!errors.postalCode}
            helperText={errors.postalCode ? errors.postalCode.message : null}
          />
          <TextField
            label="cellphone"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('cellphone')}
            error={!!errors.cellphone}
            helperText={errors.cellphone ? errors.cellphone.message : null}
          />
          <TextField
            label="telephone"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('telephone')}
            error={!!errors.telephone}
            helperText={errors.telephone ? errors.telephone.message : null}
          />
          <TextField
            label="medicalService"
            fullWidth
            variant="filled"
            margin="normal"
            {...register('medicalService')}
            error={!!errors.medicalService}
            helperText={
              errors.medicalService ? errors.medicalService.message : null
            }
          />
          <Input
            type="date"
            fullWidth
            variant="filled"
            {...register('birth')}
          />
          <button
            className={s.buton}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Enviar
          </button>
        </form>
      </Container>
    </GridWrapper>
  );
}
