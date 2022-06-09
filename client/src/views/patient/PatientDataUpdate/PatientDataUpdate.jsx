import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePatient } from '../../../redux/actions';
import './PatientDataUpdate.css';
<<<<<<< HEAD
import toast from 'react-hot-toast';
import { getPatientDni2 } from '../../../redux/actions';
import bk_validate from '../../../helpers/backend_validators';
const PatientDataUpdate = () => {
=======
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { PatientSchema } from './PatientSchema';
// import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
// import { Button } from '@material-ui/core';
// import Input from '@mui/material/Input';
// import Grid from '@material-ui/core/Grid';
// import Avatar from '@mui/material/Avatar';
import { getPatientDni2 } from '../../../redux/actions';
import bk_validate from '../../../helpers/backend_validators';
import toast from 'react-hot-toast';


export default function PatientDataUpdate() {
>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const [validations, setValidations] = useState([false, null]);
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));
  const [validations, setValidations] = useState([false, null]);

  const [user, setUser] = useState({
    name: SearchedPatient.name,
    lastName: SearchedPatient.lastName,
    document: SearchedPatient.document,
    birth: SearchedPatient.birth,
    street: SearchedPatient.street,
    number: SearchedPatient.number,
    city: SearchedPatient.city,
    postalCode: SearchedPatient.postalCode,
    telephone: SearchedPatient.telephone,
    cellphone: SearchedPatient.cellphone,
    email: SearchedPatient.email,
<<<<<<< HEAD
  });
  async function validatePatient() {
    const [fail, err] = await bk_validate.Patient(
      { infoUser, infoPatient },
      patientID
    );
    if (fail) {
      setValidations([true, err]);
    } else {
      setValidations([false, null]);
    }
    console.log('VALIDATIONS Fun, 2 => ', validations);
  }
=======
    medicalService: '',
  })
>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e

  useEffect(() => {
    dispatch(getPatientDni2(uno.document));
    // if (!SearchedPatient.medicalService) {
    // }
    validatePatient();
  }, [dispatch, user]);
<<<<<<< HEAD
=======

  async function validatePatient() {
    const [fail, err] = await bk_validate.Patient(
      { infoUser, infoPatient },
      patientID
    );
    if (fail) {
      setValidations([true, err]);
    } else {
      setValidations([false, null]);
    }
    // console.log('VALIDATIONS Fun, 2 => ', validations);
  }

  let [fail, err] = validations;

>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e
  // const {
  //   handleSubmit,
  //   register,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(PatientSchema),
  // });

<<<<<<< HEAD
  console.log(user);
  if (SearchedPatient.email === user.email) {
    var infoUser = {
      name: user.name,
      lastName: user.lastName,
      birth: user.birth,
      telephone: user.telephone + '',
      cellphone: user.cellphone + '',
      street: user.street,
      number: parseInt(user.number),
      city: user.city,
      postalCode: parseInt(user.postalCode),
      userType: 'Patient',
    };
  } else {
    var infoUser = {
      name: user.name,
      lastName: user.lastName,
      birth: user.birth,
      telephone: user.telephone + '',
      cellphone: user.cellphone + '',
      street: user.street,
      number: parseInt(user.number),
      city: user.city,
      postalCode: parseInt(user.postalCode),
      userType: 'Patient',
      email: user.email,
    };
=======
  console.log(user)

  const infoUser = {
    name: user.name,
    lastName: user.lastName,
    birth: user.birth,
    telephone: user.telephone + '',
    cellphone: user.cellphone + '',
    street: user.street,
    number: (user.number),
    city: user.city,
    postalCode: (user.postalCode),
    // userType: 'Patient'
>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e
  }

  const infoPatient = {
    medicalService: user.medicalService,
  };

<<<<<<< HEAD
  const patientID = SearchedPatient.Patient.ID;
=======
  const patientID = SearchedPatient.ID
>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e

  const handleSubmit = e => {
    console.log(patientID, infoPatient, infoUser);
    // console.log({ infoUser, infoPatient, patientID });
    console.log(fail)
    console.log(err)
    e.preventDefault();

    try {
      if (fail) {
        toast.error('Your form has errors, please check it out.');
      } else {
<<<<<<< HEAD
        console.log(patientID, infoPatient, infoUser);
        dispatch(updatePatient(patientID, infoPatient, infoUser));
        setTimeout(() => {
          dispatch(getPatientDni2(uno.document));
        }, 1000);
        toast.success('Patient updated successfully');
        navigate(`/home`);
      }
    } catch (error) {
      console.log(errors);
=======
        dispatch(updatePatient(patientID, infoPatient, infoUser));
        toast.success('Patient update successfully');
        navigate(`/home`);
      }
    } catch (error) {
      console.error(error);
>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e
      toast.error('Something went wrong, please try again.');
    }
  };
  let [fail, err] = validations;
  //#endregion

  const handleChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });

    // setUser(e.target.value);
  };

  return (
<<<<<<< HEAD
    <div className="container">
      <div className="container2">
        <form onSubmit={onSubmit}>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className="subtitle">Document</div>
              <input
                className="input"
                name="document"
                value={user.document}
                onChange={handleChange}
              ></input>
=======
    <div className='container'>
      <div className='container2'>
        <form onSubmit={handleSubmit}>
          <div className='rowContainer'>
            <div className='containerDivInput' style={{ width: '12vw' }}>
              <div className='subtitle' >
                Document
              </div>
              <input className='input' name='document' value={user.document} onChange={handleChange}>
              </input>
>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e
            </div>
            <div className="containerDivInput" style={{ width: '20vw' }}>
              <div className="subtitle">Name</div>
              <input
                className="input"
                name="name"
                value={user.name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '20vw' }}>
              <div className="subtitle">Lastname</div>
              <input
                className="input"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className="subtitle">Birthday</div>
              <input
                type="date"
                name="birth"
                className="input"
                value={user.birth}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '15vw' }}>
              <div className="subtitle">Street</div>
              <input
                className="input"
                name="street"
                value={user.street}
                onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '20vw' }}>
              <div className="subtitle">Number</div>
              <input
                className="input"
                name="number"
                value={user.number}
                onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '20vw' }}>
              <div className="subtitle">City</div>
              <input
                className="input"
                name="city"
                value={user.city}
                onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '9vw' }}>
              <div className="subtitle">Postal Code</div>
              <input
                type="input"
                name="postalCode"
                className="input"
                value={user.postalCode}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '18vw' }}>
              <div className="subtitle">Telephone</div>
              <input
                className="input"
                name="telephone"
                value={user.telephone}
                onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '18vw' }}>
              <div className="subtitle">Cellphone</div>
              <input
                className="input"
                name="cellphone"
                value={user.cellphone}
                onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '20vw' }}>
              <div className="subtitle">Email</div>
              <input
                className="input"
                name="email"
                value={user.email}
                onChange={handleChange}
              ></input>
            </div>
<<<<<<< HEAD
          </div>{' '}
          <button type="submit" className="button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
export default PatientDataUpdate;
=======
          </div>
          <button type="submit" className='button' >
            Update
          </button>
        </form>
      </div >
    </div>
  );
}









>>>>>>> cc26f2cdfffa68b7fafc60744f4458bdf4552d5e
