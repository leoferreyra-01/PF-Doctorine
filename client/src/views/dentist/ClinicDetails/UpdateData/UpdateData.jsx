import React, { useState } from 'react';
import s from './UpdateData.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateClinic } from '../../../../redux/actions';
import Swal from 'sweetalert2';

export default function UpdateData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clinic = useSelector(state => state.clinic);
  const [updatedClinic, setUpdatedClinic] = useState(clinic);

  const handleChange = e => {
    setUpdatedClinic({ ...updatedClinic, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateClinic(updatedClinic));
    Swal.fire(
      'Update clinic successfully. Please go to initial config to change other details'
    );
    navigate('/home/clinic-details');
  };
  return (
    <div className={s.container}>
      <h2>UpdateData</h2>
      <form onSubmit={handleSubmit} className={s.form} id="CreateForm">
        <div className={s.input_container}>
          <input
            type="text"
            name="name"
            value={updatedClinic.name}
            placeholder="Enter clinic's name"
            onChange={handleChange}
            className={`${s.input} `}
          />
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="street"
            value={updatedClinic.street}
            placeholder="Enter clinic's street"
            onChange={handleChange}
            className={`${s.input} `}
          />
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="city"
            value={updatedClinic.city}
            placeholder="Enter clinic's city"
            onChange={handleChange}
            className={`${s.input}`}
          />
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            name="number"
            value={updatedClinic.number}
            placeholder="Enter clinic's street number"
            onChange={handleChange}
            className={`${s.input}`}
          />
        </div>

        <div className={s.input_container}>
          <input
            type="text"
            name="postalcode"
            value={updatedClinic.postalcode}
            placeholder="Enter clinic's postal code"
            onChange={handleChange}
            className={`${s.input}`}
          />
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="telephone"
            value={updatedClinic.telephone}
            placeholder="Enter clinic's telephone"
            onChange={handleChange}
            className={`${s.input}`}
          />
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="email"
            value={updatedClinic.email}
            placeholder="Enter clinic's email"
            onChange={handleChange}
            className={`${s.input}`}
          />
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="imgLogo"
            value={updatedClinic.imgLogo}
            placeholder="Enter clinic's image Logo"
            onChange={handleChange}
            className={`${s.input}`}
          />
        </div>
        <div className={s.input_container}>
          <input
            type="text"
            name="turnStandardDuration"
            value={updatedClinic.turnStandardDuration}
            placeholder="Enter the standard duration of a turn"
            onChange={handleChange}
            className={`${s.input}`}
          />
        </div>
      </form>
      <div>
        <button className={s.buton} type="submit" form="CreateForm">
          Update details
        </button>
      </div>
    </div>
  );
}
