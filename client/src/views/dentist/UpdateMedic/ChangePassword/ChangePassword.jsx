import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../../redux/actions';
import Swal from 'sweetalert2';

export default function changePassword() {
  const dispatch = useDispatch();
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
    // console.log(data)
    const changedPassword = {
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }
    dispatch(updatePassword(changedPassword));

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={data.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
