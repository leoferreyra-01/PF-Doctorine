import React, { useState } from 'react';
import s from './InitialConfig.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialConfigSchema } from './InitialConfigSchema';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function InitialConfig() {
  const [officeHours, setOfficeHours] = useState([]);
  const [schedule, setSchedule] = useState({
    minM: 0,
    maxM: 0,
    minAN: 0,
    maxAN: 0,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(initialConfigSchema),
  });
  const onSubmit = data => {
    console.log(data);
    console.log(officeHours);
  };

  const setWorkingHours = e => {
    e.preventDefault();
    console.log(e.target[0]);
    e.target[0].selectedIndex = 0; // asi reseteo el select al valor por defecto
  };

  return (
    <div className={s.ic_container}>
      <h2>InitialConfig</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('name')}
            placeholder="Enter clinic's name"
            className={`${s.input} ${errors.name ? `${s.danger}` : ''}`}
          />
          {errors.name && (
            <span className={s.danger}>{errors.name.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('street')}
            placeholder="Enter clinic's street"
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
            placeholder="Enter clinic's city"
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
            placeholder="Enter clinic's street number"
            className={`${s.input} ${errors.number ? `${s.danger}` : ''}`}
          />
          {errors.number && (
            <span className={s.danger}>{errors.number.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            {...register('postalcode')}
            placeholder="Enter clinic's postal code"
            className={`${s.input} ${errors.postalcode ? `${s.danger}` : ''}`}
          />
          {errors.postalcode && (
            <span className={s.danger}>{errors.postalcode.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('telephone')}
            placeholder="Enter clinic's telephone"
            className={`${s.input} ${errors.telephone ? `${s.danger}` : ''}`}
          />
          {errors.telephone && (
            <span className={s.danger}>{errors.telephone.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('email')}
            placeholder="Enter clinic's email"
            className={`${s.input} ${errors.email ? `${s.danger}` : ''}`}
          />
          {errors.email && (
            <span className={s.danger}>{errors.email.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('imgLogo')}
            placeholder="Enter clinic's image Logo"
            className={`${s.input} ${errors.imgLogo ? `${s.danger}` : ''}`}
          />
          {errors.imgLogo && (
            <span className={s.danger}>{errors.imgLogo.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            {...register('turnStandardDuration')}
            placeholder="Enter the standard duration of a turn"
            className={`${s.input} ${
              errors.turnStandardDuration ? `${s.danger}` : ''
            }`}
          />
          {errors.turnStandardDuration && (
            <span className={s.danger}>
              {errors.turnStandardDuration.message}
            </span>
          )}
        </div>

        <div>
          <button className={s.buton} type="submit">
            Set details
          </button>
        </div>
      </form>
      <form onSubmit={setWorkingHours}>
        <label>Select a Day of atention</label>
        <select name="officeHours">
          <option hidden value="">
            Select a Day
          </option>
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <label>Morning schedule</label>
        <input
          type="number"
          name="morningInit"
          placeholder="Enter the Start of the turn"
        />
        <input
          type="number"
          name="morningEnd"
          placeholder="Enter the End of the turn"
        />
        <label>Afternoon schedule</label>
        <input
          type="number"
          name="afterNoonInit"
          placeholder="Enter the Start of the turn"
        />
        <input
          type="number"
          name="afterNoonEnd"
          placeholder="Enter the End of the turn"
        />
        <div>
          <button className={s.buton} type="submit">
            Set working hours
          </button>
        </div>
      </form>
    </div>
  );
}
