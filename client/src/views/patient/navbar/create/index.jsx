import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema } from './patientSchema';

export default function CreatePatient() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema),
  });
  const onSubmit = data => {
    data.userType = 'Patient';
    console.log(data);
  };

  return (
    <div>
      <h2>Create Patient</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name')}
          placeholder="Enter your name"
        />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          type="text"
          {...register('lastName')}
          placeholder="Enter your lastname"
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input
          type="text"
          {...register('document')}
          placeholder="Enter your ID"
        />
        {errors.document && <span>{errors.document.message}</span>}
        <input
          type="text"
          {...register('email')}
          placeholder="Enter your email"
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="text"
          {...register('street')}
          placeholder="Enter your street"
        />
        {errors.street && <span>{errors.street.message}</span>}
        <input
          type="text"
          {...register('city')}
          placeholder="Enter your city"
        />
        {errors.city && <span>{errors.city.message}</span>}
        <input
          type="text"
          {...register('postalCode')}
          placeholder="Enter your postal code"
        />
        {errors.postalCode && <span>{errors.postalCode.message}</span>}
        <input type="date" {...register('birth')} />
        {/*Ver como se valida este tipo de input */}
        <input
          type="text"
          {...register('cellphone')}
          placeholder="Enter your cellphone number"
        />
        {errors.cellphone && <span>{errors.cellphone.message}</span>}
        <input
          type="password"
          {...register('password')}
          placeholder="Enter your password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          placeholder="Confirm your password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span>Passwords must match</span>
        )}
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
