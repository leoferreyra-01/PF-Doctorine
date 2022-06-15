import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function changePassword() {
  const dispatch = useDispatch();
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password</label>
          <input
            type='password'
            name='currentPassword'
            value={data.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            name='newPassword'
            value={data.newPassword}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Change Password</button>
      </form>
    </div>
  );
}
