import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema } from './patientSchema';

export default function RegisterPatient() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema),
  });
  const onSubmit = data => {
    data.password = data.document;
    data.userType = 'Patient';
    console.log(data);
  };

  return (
    <div>
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name')}
          placeholder="Ingrese el nombre del paciente..."
        />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          type="text"
          {...register('lastName')}
          placeholder="Ingrese el apellido del paciente..."
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input
          type="text"
          {...register('document')}
          placeholder="Ingrese el dni del paciente..."
        />
        {errors.document && <span>{errors.document.message}</span>}
        <input
          type="text"
          {...register('email')}
          placeholder="Ingrese el correo electronico del paciente..."
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="text"
          {...register('street')}
          placeholder="Ingrese la calle del paciente..."
        />
        {errors.street && <span>{errors.street.message}</span>}
        <input
          type="text"
          {...register('city')}
          placeholder="Ingrese la ciudad del paciente..."
        />
        {errors.city && <span>{errors.city.message}</span>}
        <input
          type="text"
          {...register('postalCode')}
          placeholder="Ingrese el codigo postal del paciente..."
        />
        {errors.postalCode && <span>{errors.postalCode.message}</span>}
        <input type="date" {...register('birthDate')} placeholder="" />
        {/*Ver como se valida este campo */}
        <input
          type="text"
          {...register('cellphone')}
          placeholder="Ingrese el numero de telefono del paciente..."
        />
        {errors.cellphone && <span>{errors.cellphone.message}</span>}
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}
