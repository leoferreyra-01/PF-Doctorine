import React, { useState } from 'react';
import s from './InitialConfig.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialConfigSchema } from './InitialConfigSchema';
import Swal from 'sweetalert2';
import { postClinic } from '../../../../redux/actions';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const formatMinutes = minutes => {
  switch (minutes) {
    case '30':
      return '.5';

    case '45':
      return '.75';

    default:
      return '';
  }
};
const deFormatHours = number => {
  let hours = Math.floor(number);
  let minutes = Math.floor((number - hours) * 60);
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
};

export default function InitialConfig() {
  const dispatch = useDispatch();
  const [officeHours, setOfficeHours] = useState([[], [], [], [], [], [], []]);
  let filledOfficeHours = !!officeHours.flat(1).length;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(initialConfigSchema),
  });
  const onSubmit = data => {
    if (!filledOfficeHours) {
      Swal.fire({
        icon: 'error',
        title:
          'Please fill at least one day with it working hours before submitting',
      });
    } else {
      const clinic = {
        ...data,
        officeHours: JSON.stringify(officeHours),
      };
      dispatch(postClinic(clinic));
    }
    console.log(data);
    console.log(officeHours);
  };

  const setWorkingHours = e => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target[0]);
    console.log(e.target[0].selectedIndex); // el indice del dia de la semana seleccionado
    //e.target[0].selectedIndex = 0; // asi reseteo el select al valor por defecto
    //e.target[0]; // Select day
    console.log(e.target[1].value); // minM
    console.log(e.target[2].value); // maxM
    console.log(e.target[3].value); // minAN
    console.log(e.target[4].value); // maxAN

    const minM = e.target[1].value.split(':');
    const maxM = e.target[2].value.split(':');
    const minAN = e.target[3].value.split(':');
    const maxAN = e.target[4].value.split(':');
    const index = e.target[0].selectedIndex - 1;

    if (!filledOfficeHours && index !== 0 && index !== 6) {
      const working = [
        {
          min: minM[0] + formatMinutes(minM[1]),
          max: maxM[0] + formatMinutes(maxM[1]),
        },
        {
          min: minAN[0] + formatMinutes(minAN[1]),
          max: maxAN[0] + formatMinutes(maxAN[1]),
        },
      ];
      setOfficeHours([
        [],
        [...working],
        [...working],
        [...working],
        [...working],
        [...working],
        [],
      ]);
    } else {
      setOfficeHours(prevState => {
        const newState = [...prevState];
        newState[index] = [
          {
            min: minM[0] + formatMinutes(minM[1]),
            max: maxM[0] + formatMinutes(maxM[1]),
          },
          {
            min: minAN[0] + formatMinutes(minAN[1]),
            max: maxAN[0] + formatMinutes(maxAN[1]),
          },
        ];
        return newState;
      });
    }
    e.target.reset();
  };
  //#region
  return (
    <div className={s.ic_container}>
      <h2>InitialConfig</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
        id="CreateForm"
      >
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
      </form>
      <form onSubmit={setWorkingHours}>
        <div>
          <label className={s.selectLabel}>Select a Day of atention: </label>
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
        </div>
        <div>
          <label className={s.schLabel}>Morning schedule</label>
          <input
            type="time"
            name="morningInit"
            placeholder="Enter the Start of the turn"
            className={s.schInput}
          />
          <input
            type="time"
            name="morningEnd"
            placeholder="Enter the End of the turn"
            className={s.schInput}
          />
        </div>
        <div>
          <label className={s.schLabel}>Afternoon schedule</label>
          <input
            type="time"
            name="afterNoonInit"
            placeholder="Enter the Start of the turn"
            className={s.schInput}
          />
          <input
            type="time"
            name="afterNoonEnd"
            placeholder="Enter the End of the turn"
            className={s.schInput}
          />
        </div>
        <div>
          <button className={s.buton} type="submit">
            Set working hours
          </button>
        </div>
      </form>
      <div className={s.whContainer}>
        <h3>Working Hours</h3>
        {filledOfficeHours ? (
          officeHours.map((officeHour, index) => {
            let [morning, afterNoon] = officeHour;
            return (
              <div className={s.dayContainer} key={index}>
                <p className={s.whText}>{days[index]}</p>
                {officeHour.length > 0 ? (
                  <div className={s.hText}>
                    <p className={s.whText}>{`${deFormatHours(
                      morning.min * 1
                    )} ${morning.min * 1 < 12 ? 'AM' : 'PM'} - ${deFormatHours(
                      morning.max * 1
                    )} ${morning.max * 1 < 12 ? 'AM' : 'PM'}`}</p>
                    <p className={s.whText}>{`${deFormatHours(
                      afterNoon.min * 1
                    )} ${
                      afterNoon.min * 1 < 12 ? 'AM' : 'PM'
                    } - ${deFormatHours(afterNoon.max * 1)} ${
                      afterNoon.max * 1 < 12 ? 'AM' : 'PM'
                    }`}</p>
                  </div>
                ) : (
                  <p className={s.whText}>CLOSED</p>
                )}
              </div>
            );
          })
        ) : (
          <h3>There is none working hours selected</h3>
        )}
      </div>
      <div>
        <button className={s.buton} type="submit" form="CreateForm">
          Set details
        </button>
      </div>
    </div>
  );
}
//#endregion
