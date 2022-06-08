import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePatient } from '../../../redux/actions';
import './PatientDataUpdate.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PatientSchema } from './PatientSchema';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Input from '@mui/material/Input';
import Grid from '@material-ui/core/Grid';
import Avatar from '@mui/material/Avatar';
import { getPatientDni2 } from '../../../redux/actions';

const PatientDataUpdate = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));

  console.log(uno)
  console.log(SearchedPatient)

  const [user, setUser] = useState({
    name: SearchedPatient.name,
    lastName: SearchedPatient.lastName,
    document: SearchedPatient.document,
    birth: SearchedPatient.birth,
    street: SearchedPatient.street,
    number: SearchedPatient.number,
    city: SearchedPatient.city,
    postalCode: SearchedPatient.postalCode,
    telephone: SearchedPatient.number,
    cellphone: SearchedPatient.city,
    email: SearchedPatient.email,
  })

  useEffect(() => {
    if (!SearchedPatient.medicalService) {
      dispatch(getPatientDni2(uno.document));
    }
  }, [dispatch]);

  // const {
  //   handleSubmit,
  //   register,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(PatientSchema),
  // });

  console.log(user)

  const infoUser = {
    name: user.name,
    lastName: user.lastName,
    birth: user.birth,
    telephone: parseInt(user.telephone),
    cellphone: parseInt(user.cellphone),
    street: user.street,
    number: parseInt(user.number),
    city: user.city,
    postalCode: parseInt(user.postalCode),
    userType: 'Patient'
  }
  const infoPatient = {
    medicalService: SearchedPatient.medicalService,
  };

  const patientID = {
    patientID: SearchedPatient.ID
  }

  const onSubmit = e => {
    e.preventDefault();

    try {
      console.log(patientID, infoPatient, infoUser);
      dispatch(updatePatient(patientID, infoPatient, infoUser));
      navigate(`/home`);
    } catch (error) {
      console.log(errors)
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    setUser({ ...user, [e.target.name]: e.target.value });

    // setUser(e.target.value);
  }

  return (
    <div className='container'>
      <div className='container2'>
        <form onSubmit={onSubmit}>
          <div className='rowContainer'>
            <div className='containerDivInput' style={{ width: '12vw' }}>
              <div className='subtitle' >
                Document
              </div>
              <input className='input' name='document' value={user.document} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '20vw' }}>
              <div className='subtitle' >
                Name
              </div>
              <input className='input' name='name' value={user.name} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '20vw' }}>
              <div className='subtitle' >
                Lastname
              </div>
              <input className='input' name='lastName' value={user.lastName} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '12vw' }}>
              <div className='subtitle' >
                Birthday
              </div>
              <input type='date' name='birth' className='input' value={user.birth} onChange={handleChange}>
              </input>
            </div>
          </div>
          <div className='rowContainer'>
            <div className='containerDivInput' style={{ width: '15vw' }}>
              <div className='subtitle' >
                Street
              </div>
              <input className='input' name='street' value={user.street} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '20vw' }}>
              <div className='subtitle' >
                Number
              </div>
              <input className='input' name='number' value={user.number} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '20vw' }}>
              <div className='subtitle' >
                City
              </div>
              <input className='input' name='city' value={user.city} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '9vw' }}>
              <div className='subtitle' >
                Postal Code
              </div>
              <input type='input' name='postalCode' className='input' value={user.postalCode} onChange={handleChange}>
              </input>
            </div>
          </div>
          <div className='rowContainer'>
            <div className='containerDivInput' style={{ width: '18vw' }}>
              <div className='subtitle' >
                Telephone
              </div>
              <input className='input' name='telephone' value={user.telephone} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '18vw' }}>
              <div className='subtitle' >
                Cellphone
              </div>
              <input className='input' name='cellphone' value={user.cellphone} onChange={handleChange}>
              </input>
            </div>
            <div className='containerDivInput' style={{ width: '20vw' }}>
              <div className='subtitle' >
                Email
              </div>
              <input className='input' name='email' value={user.email} onChange={handleChange}>
              </input>
            </div>
          </div>
        </form>
      </div >
      <button type="submit" className='button' >
        Update
      </button>
    </div>
  );
}
export default PatientDataUpdate;