import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPatient } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Input from '@mui/material/Input';
import s from './buton.module.css';
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
    dispatch(postPatient(patientReady));
    alert('Will be redirected to create the patients medical history');

    navigate('/home/create-clinical-history/');
  };

  return (
    <div className={s.rp_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('name')}
            placeholder="Enter the patient's name..."
            className={`${s.input} ${errors.name ? `${s.danger}` : ''}`}
          />
          {errors.name && (
            <span className={s.danger}>{errors.name.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('lastName')}
            placeholder="Enter the patient's lastname..."
            className={`${s.input} ${errors.lastName ? `${s.danger}` : ''}`}
          />
          {errors.lastName && (
            <span className={s.danger}>{errors.lastName.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('document')}
            placeholder="Enter the patient's DNI..."
            className={`${s.input} ${errors.document ? `${s.danger}` : ''}`}
          />
          {errors.document && (
            <span className={s.danger}>{errors.document.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('email')}
            placeholder="Enter the patient's email..."
            className={`${s.input} ${errors.email ? `${s.danger}` : ''}`}
          />
          {errors.email && (
            <span className={s.danger}>{errors.email.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('street')}
            placeholder="Enter the patient's street..."
            className={`${s.input} ${errors.street ? `${s.danger}` : ''}`}
          />
          {errors.street && (
            <span className={s.danger}>{errors.street.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('city')}
            placeholder="Enter the patient's city..."
            className={`${s.input} ${errors.city ? `${s.danger}` : ''}`}
          />
          {errors.city && (
            <span className={s.danger}>{errors.city.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('number')}
            placeholder="Enter the patient's  street number..."
            className={`${s.input} ${errors.number ? `${s.danger}` : ''}`}
          />
          {errors.number && (
            <span className={s.danger}>{errors.number.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('postalCode')}
            placeholder="Enter the patient's zip code..."
            className={`${s.input} ${errors.postalCode ? `${s.danger}` : ''}`}
          />
          {errors.postalCode && (
            <span className={s.danger}>{errors.postalCode.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('cellphone')}
            placeholder="Enter the patient's phone number..."
            className={`${s.input} ${errors.cellphone ? `${s.danger}` : ''}`}
          />
          {errors.cellphone && (
            <span className={s.danger}>{errors.cellphone.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('telephone')}
            placeholder="Enter the patient's local phone number..."
            className={`${s.input} ${errors.telephone ? `${s.danger}` : ''}`}
          />
          {errors.telephone && (
            <span className={s.danger}>{errors.telephone.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('medicalService')}
            placeholder="Enter the patient's medical service..."
            className={`${s.input} ${
              errors.medicalService ? `${s.danger}` : ''
            }`}
          />
          {errors.medicalService && (
            <span className={s.danger}>{errors.medicalService.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <h3>Enter the patient's date of birth</h3>
          <input
            type="date"
            {...register('birth')}
            className={`${s.input} ${errors.birth ? `${s.danger}` : ''}`}
          />
          {errors.birth && (
            <span className={s.danger}>{errors.birth.message}</span>
          )}
        </div>
        <div>
          <button className={s.buton} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

{
  /* <TextField
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
        <Input type="date" fullWidth variant="filled" {...register('birth')} /> */
}
