import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Input from '@mui/material/Input';
import Button from '@material-ui/core/Button';
import GridWrapper from '../../../../sharedComponents/GridWrapper/GridWrapper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerPatientSchema } from './registerPatientSchema';

export default function RegisterPatient() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerPatientSchema),
  });
  const onSubmit = data => {
    data.password = data.document;
    data.userType = 'Patient';
    console.log(data);
  };

  return (
    <GridWrapper>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
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
          <Input
            type="date"
            fullWidth
            variant="filled"
            margin="dense"
            {...register('birthDate')}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar
          </Button>
        </form>
      </Container>
    </GridWrapper>
  );
}
