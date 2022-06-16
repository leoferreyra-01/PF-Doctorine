import React from 'react';
import { useDispatch } from 'react-redux';
import { postPatient } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import s from './buton.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerPatientSchema } from './registerPatientSchema';
import sendPatientHelper from './sendPatientHelper';
import Swal from 'sweetalert2';

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
    Swal.fire({
      icon: 'success',
      title: `You will be redirected to create the patient's medical history`,
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      navigate('/home/create-clinical-history/');
    }, 1500);
  };

  return (
    <div className={s.rp_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('name')}
            placeholder="Enter patient's name"
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
            placeholder="Enter patient's lastname"
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
            placeholder="Enter patient's document"
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
            placeholder="Enter patient's email"
            className={`${s.input} ${errors.email ? `${s.danger}` : ''}`}
          />
          {errors.email && (
            <span className={s.danger}>{errors.email.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('city')}
            placeholder="Enter patient's city"
            className={`${s.input} ${errors.city ? `${s.danger}` : ''}`}
          />
          {errors.city && (
            <span className={s.danger}>{errors.city.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('street')}
            placeholder="Enter patient's street"
            className={`${s.input} ${errors.street ? `${s.danger}` : ''}`}
          />
          {errors.street && (
            <span className={s.danger}>{errors.street.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('number')}
            placeholder="Enter patient's street number"
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
            placeholder="Enter patient's postal code"
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
            placeholder="Enter patient's cellphone"
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
            placeholder="Enter patient's telephone"
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
            placeholder="Enter patient's medical service"
            className={`${s.input} ${
              errors.medicalService ? `${s.danger}` : ''
            }`}
          />
          {errors.medicalService && (
            <span className={s.danger}>{errors.medicalService.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <h3 className={s.labelBirth}>Enter the patient's birth date</h3>
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
          <button className={s.btn} type="submit" style={{ marginTop: '2rem' }}>
            <span className={s.transition}></span>
            <span className={s.gradient}></span>
            <span className={s.label}>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
