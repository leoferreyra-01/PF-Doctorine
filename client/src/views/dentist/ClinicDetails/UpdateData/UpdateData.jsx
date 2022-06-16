import React, { useState } from 'react';
import s from './UpdateData.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateClinic } from '../../../../redux/actions';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateConfigSchema } from './UpdateConfigSchema';

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

export default function UpdateData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clinic = useSelector(state => state.clinic);
  const jsonOfficeHours = JSON.parse(clinic.officeHours);
  const [updatedClinic, setUpdatedClinic] = useState({
    ...clinic,
    officeHours: jsonOfficeHours,
  });

  const [selectedDay, setSelectedDay] = useState({
    morningMin: '',
    morningMax: '',
    afternoonMin: '',
    afternoonMax: '',
  });

  const handleChange = e => {
    setUpdatedClinic({ ...updatedClinic, [e.target.name]: e.target.value });
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateConfigSchema),
  });
  const onSubmit = data => {
    dispatch(
      updateClinic({
        ID: clinic.ID,
        ...data,
        officeHours: JSON.stringify(updatedClinic.officeHours),
      })
    );
    Swal.fire('Update clinic details successfully.');
    navigate('/home/clinic-details');
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

    const newState = [...updatedClinic.officeHours];
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
    setUpdatedClinic({ ...updatedClinic, officeHours: newState });
    e.target.reset();
    setSelectedDay({
      morningMin: '',
      morningMax: '',
      afternoonMin: '',
      afternoonMax: '',
    });
  };

  const handleSelectDay = e => {
    console.log(updatedClinic);
    console.log(e.target.selectedIndex);
    console.log(updatedClinic.officeHours);
    if (updatedClinic.officeHours[e.target.selectedIndex - 1].length === 0) {
      setSelectedDay({
        morningMin: '',
        morningMax: '',
        afternoonMin: '',
        afternoonMax: '',
      });
    } else {
      setSelectedDay({
        morningMin: deFormatHours(
          updatedClinic.officeHours[e.target.selectedIndex - 1][0].min
        ),
        morningMax: deFormatHours(
          updatedClinic.officeHours[e.target.selectedIndex - 1][0].max
        ),
        afternoonMin: deFormatHours(
          updatedClinic.officeHours[e.target.selectedIndex - 1][1].min
        ),
        afternoonMax: deFormatHours(
          updatedClinic.officeHours[e.target.selectedIndex - 1][1].max
        ),
      });
    }
  };

  const handleHoursChange = e => {
    setSelectedDay({
      ...selectedDay,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={s.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
        id="CreateForm"
      >
        <div className={s.input_container}>
          <input
            type="text"
            name="name"
            {...register('name')}
            value={updatedClinic.name}
            placeholder="Enter clinic's name"
            onChange={handleChange}
            className={`${s.input} ${errors.name ? `${s.danger}` : ''}`}
          />
          {errors.name && (
            <span className={s.danger}>{errors.name.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="street"
            {...register('street')}
            value={updatedClinic.street}
            placeholder="Enter clinic's street"
            onChange={handleChange}
            className={`${s.input} ${errors.street ? `${s.danger}` : ''}`}
          />
          {errors.street && (
            <span className={s.danger}>{errors.street.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="city"
            {...register('city')}
            value={updatedClinic.city}
            placeholder="Enter clinic's city"
            onChange={handleChange}
            className={`${s.input} ${errors.city ? `${s.danger}` : ''}`}
          />
          {errors.city && (
            <span className={s.danger}>{errors.city.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            name="number"
            {...register('number')}
            value={updatedClinic.number}
            placeholder="Enter clinic's street number"
            onChange={handleChange}
            className={`${s.input} ${errors.number ? `${s.danger}` : ''}`}
          />
          {errors.number && (
            <span className={s.danger}>{errors.number.message}</span>
          )}
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            name="postalcode"
            {...register('postalcode')}
            value={updatedClinic.postalcode}
            placeholder="Enter clinic's postal code"
            onChange={handleChange}
            className={`${s.input} ${errors.postalcode ? `${s.danger}` : ''}`}
          />
          {errors.postalcode && (
            <span className={s.danger}>{errors.postalcode.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="telephone"
            {...register('telephone')}
            value={updatedClinic.telephone}
            placeholder="Enter clinic's telephone"
            onChange={handleChange}
            className={`${s.input} ${errors.telephone ? `${s.danger}` : ''}`}
          />
          {errors.telephone && (
            <span className={s.danger}>{errors.telephone.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="email"
            {...register('email')}
            value={updatedClinic.email}
            placeholder="Enter clinic's email"
            onChange={handleChange}
            className={`${s.input} ${errors.email ? `${s.danger}` : ''}`}
          />
          {errors.email && (
            <span className={s.danger}>{errors.email.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="imgLogo"
            {...register('imgLogo')}
            value={updatedClinic.imgLogo}
            placeholder="Enter clinic's image Logo"
            onChange={handleChange}
            className={`${s.input} ${errors.imgLogo ? `${s.danger}` : ''}`}
          />
          {errors.imgLogo && (
            <span className={s.danger}>{errors.imgLogo.message}</span>
          )}
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="turnStandardDuration"
            {...register('turnStandardDuration')}
            value={updatedClinic.turnStandardDuration}
            placeholder="Enter the standard duration of a turn"
            onChange={handleChange}
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
      <form onSubmit={setWorkingHours} className={s.hours_container}>
        <div>
          <label className={s.selectLabel}>Select a Day of atention: </label>
          <select name="officeHours" onChange={handleSelectDay}>
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
            name="morningMin"
            value={selectedDay.morningMin}
            onChange={handleHoursChange}
            placeholder="Enter the Start of the turn"
            className={s.schInput}
          />
          <input
            type="time"
            name="morningMax"
            value={selectedDay.morningMax}
            onChange={handleHoursChange}
            placeholder="Enter the End of the turn"
            className={s.schInput}
          />
        </div>
        <div>
          <label className={s.schLabel}>Afternoon schedule</label>
          <input
            type="time"
            name="afternoonMin"
            value={selectedDay.afternoonMin}
            onChange={handleHoursChange}
            placeholder="Enter the Start of the turn"
            className={s.schInput}
          />
          <input
            type="time"
            name="afternoonMax"
            value={selectedDay.afternoonMax}
            onChange={handleHoursChange}
            placeholder="Enter the End of the turn"
            className={s.schInput}
          />
        </div>
        <div>
          <button className={s.btn} type="submit">
            <span className={s.transition}></span>
            <span className={s.gradient}></span>
            <span className={s.label}>Set working hours</span>
          </button>
        </div>
      </form>
      <div className={s.whContainer}>
        <h3 style={{ color: 'white' }}>Working Hours</h3>
        {updatedClinic.officeHours.length > 0 ? (
          updatedClinic.officeHours.map((officeHour, index) => {
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
        <button className={s.btn} type="submit" form="CreateForm">
          <span className={s.transition}></span>
          <span className={s.gradient}></span>
          <span className={s.label}>Update details</span>
        </button>
      </div>
    </div>
  );
}
