import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { home } from '../redux/actions';

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let select = 'medic';
  const handleSubmit = e => {
    e.preventDefault();
    console.log(select);
    dispatch(home(select));
    navigate('home');
  };
  const handleOnClick = e => (select = e.target.value);
  return (
    //if select === odontologo: home de odontologo; else home de paciente

    <form onSubmit={handleSubmit}>
      <select name="select">
        <option value="medic" onClick={handleOnClick}>
          Médico
        </option>
        <option value="patient" onClick={handleOnClick}>
          Paciente
        </option>
      </select>
      <input type="submit" value="Ingresar" />
    </form>
  );
}
