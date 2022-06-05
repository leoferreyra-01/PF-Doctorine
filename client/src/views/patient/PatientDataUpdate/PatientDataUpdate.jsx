import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postClinic } from '../../../redux/actions';
import s from './PatientDataUpdate.css';
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
  const dispatch = useDispatch();
  // const user = {};
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));

  const [user, serUser] = useState({
    name: SearchedPatient.name
  })

  useEffect(() => {
    if (!SearchedPatient.medicalService) {
      dispatch(getPatientDni2(uno.document));
      // recargar()
    }
  }, [dispatch]);

  const Styles1 = {
    wrapper: {
      // width: '100%',
      display: 'flex',
      // flexDirection: 'column',
      // backgroundColor: '#009be5',
      padding: '20px',
      flexGrow: 1,
      // marginLeft: '320px'
    },
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PatientSchema),
  });
  const onSubmit = data => {
    // for (const [key, value] of Object.entries(data)) {
    //   if (key.includes('user')) {
    //     user[key] = value;
    //   } else if (key.includes('clinic')) {
    //     clinic[key] = value;
    //   } else if (key.includes('doctor')) {
    //     doctor[key] = value;
    //   }
    // }
    // user.userType = 'Medic';
    // console.log(user);
    // console.log(clinic);
    // console.log(doctor);
    // dispatch(postClinic(clinic));
    reset();
  };
  const inputProps = {
    heith: 300,
  };
  return (
    <div className='container'>
      <div>
        <div>
          <input value={user.name}>
          </input>
        </div>
      </div>
    </div >
  );
}
export default PatientDataUpdate;