import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './ChangePassword.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function changePassword() {
  const navigate = useNavigate();
  const medic = useSelector(state => state.searchedMedic);

  const [data, setData] = useState({
    email: medic.email,
    currentPassword: '',
    password: '',
    newPassword: '',
  });

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const changedPassword = {
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    if (data.password !== data.newPassword) {
      Swal.fire({
        icon: 'error',
        title: 'The new passwords does not match',
        text: 'Please try again',
      });
    } else {
      try {
        const result = await axios.put(`/password/update`, changedPassword);
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Password updated',
            text: 'Please login again',
          });
          navigate('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Password not updated, please try again',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating your password, you were redirected to the login page for your safety',
        });
        navigate('/');
      }
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.input_container}>
          <div className={s.form_group_field}>
            <input
              className={s.form__field}
              placeholder="Current Password"
              type="password"
              name="currentPassword"
              value={data.currentPassword}
              onChange={handleChange}
            />
            <label className={s.form__label} for="currentPassword">
              Current Password
            </label>
          </div>
        </div>
        <div className={s.input_container}>
          <div className={s.form_group_field}>
            <input
              className={s.form__field}
              type="password"
              name="password"
              placeholder="New Password"
              value={data.password}
              onChange={handleChange}
            />
            <label className={s.form__label} for="password">
              New Password
            </label>
          </div>
        </div>
        <div className={s.input_container}>
          <div className={s.form_group_field}>
            <input
              className={s.form__field}
              placeholder="Confirm Password"
              type="password"
              name="newPassword"
              value={data.newPassword}
              onChange={handleChange}
            />
            <label className={s.form__label} for="newPassword">
              Confirm Password
            </label>
          </div>
        </div>

        <button className={s.btn} type="submit">
          <span className={s.transition}></span>
          <span className={s.gradient}></span>
          <span className={s.label}>Change Password</span>
        </button>
      </form>
    </div>
  );
}
