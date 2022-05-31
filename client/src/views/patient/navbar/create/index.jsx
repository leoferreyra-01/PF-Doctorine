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
          placeholder="Ingrese su nombre ..."
        />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          type="text"
          {...register('lastName')}
          placeholder="Ingrese su apellido ..."
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input
          type="text"
          {...register('document')}
          placeholder="Ingrese su dni ..."
        />
        {errors.document && <span>{errors.document.message}</span>}
        <input
          type="text"
          {...register('email')}
          placeholder="Ingrese su correo electronico ..."
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="text"
          {...register('street')}
          placeholder="Ingrese su calle ..."
        />
        {errors.street && <span>{errors.street.message}</span>}
        <input
          type="text"
          {...register('city')}
          placeholder="Ingrese su ciudad ..."
        />
        {errors.city && <span>{errors.city.message}</span>}
        <input
          type="text"
          {...register('postalCode')}
          placeholder="Ingrese su codigo postal ..."
        />
        {errors.postalCode && <span>{errors.postalCode.message}</span>}
        <input type="date" {...register('birth')} />
        {/*Ver como se valida este tipo de input */}
        <input
          type="text"
          {...register('cellphone')}
          placeholder="Ingrese su numero de telefono ..."
        />
        {errors.cellphone && <span>{errors.cellphone.message}</span>}
        <input
          type="password"
          {...register('password')}
          placeholder="Ingrese su contraseña ..."
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          placeholder="confirme su contraseña..."
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span>'Las contraseñas deben coincidir'</span>
        )}
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}
