import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updatePatient } from '../../../redux/actions';
import './PatientDataUpdate.css';
import { getPatientDni2 } from '../../../redux/actions';
import bk_validate from '../../../helpers/backend_validators';
import Swal from 'sweetalert2';

const PatientDataUpdate = () => {
  // eslint-disable-next-line
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const [validations, setValidations] = useState([false, null]);
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));

  const [user, setUser] = useState({
    name: '',
    lastName: 'SearchedPatient.lastName',
    document: 'SearchedPatient.document',
    birth: 'SearchedPatient.birth',
    street: 'SearchedPatient.street',
    number: 'SearchedPatient.number',
    city: 'SearchedPatient.city',
    postalCode: 'SearchedPatient.postalCode',
    telephone: 'SearchedPatient.telephone',
    cellphone: 'SearchedPatient.cellphone',
    email: 'SearchedPatient.email',
  });
  setTimeout(() => {
    setUser({
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
    });
  }, 10000);

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

  useEffect(() => {
    dispatch(getPatientDni2(uno.document));

    // if (!SearchedPatient.medicalService) {
    // }
    validatePatient();
  }, [dispatch, user]);
  // const {
  //   handleSubmit,
  //   register,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(PatientSchema),
  // });

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
    // eslint-disable-next-line
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
  }

  const infoPatient = {
    medicalService: SearchedPatient.medicalService,
  };

  const patientID = SearchedPatient.Patient.ID;

  const onSubmit = e => {
    e.preventDefault();

    try {
      if (fail) {
        Swal.fire({
          icon: 'error',
          title: 'Your form has errors, please check it out.',
        });
      } else {
        console.log(patientID, infoPatient, infoUser);
        dispatch(updatePatient(patientID, infoPatient, infoUser));
        setTimeout(() => {
          dispatch(getPatientDni2(uno.document));
        }, 1000);
        Swal.fire({
          icon: 'success',
          title: 'Your data has been updated successfully',
        });
        navigate(`/home`);
      }
    } catch (error) {
      console.log(errors);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, please try again.',
      });
    }
  };
  // eslint-disable-next-line
  let [fail, err] = validations;
  //#endregion

  const handleChange = e => {
    e.preventDefault();

    setUser({ ...user, [e.target.name]: e.target.value });

    // setUser(e.target.value);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <div className="rowContainer">
          <div className="containerDivInput" style={{ width: '12vw' }}>
            <div className="subtitle">Document</div>
            <input
              className="input"
              name="document"
              value={user.document}
              onChange={handleChange}
            ></input>
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
            <div className="subtitle1">Birthday</div>
            <input
              type="date"
              name="birth"
              className="input1"
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
        </div>{' '}
        <button type="submit" className="button">
          Update
        </button>
      </form>
      <Link className="button1" to="/home/create-clinical-history">
        {' '}
        Create Initial History Clinic{' '}
      </Link>
    </div>
  );
};
export default PatientDataUpdate;
