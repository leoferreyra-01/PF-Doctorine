import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
import S from './UpdatePatient.module.css';
import { updatePatient } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import bk_validate from '../../../helpers/backend_validators';

export default function UpdatePatient() {
  const { patientID } = useParams();
  const { patient } = useSelector(state => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getPatient(patientID)).then(() => {
    setData({
      name: patient.name,
      lastName: patient.lastName,
      birth: patient.birth,
      telephone: patient.telephone,
      cellphone: patient.cellphone,
      street: patient.street,
      number: patient.number,
      city: patient.city,
      postalCode: patient.postalCode,
      medicalService: patient.Patient.medicalService,
    });
    // });
  }, []);

  const [data, setData] = useState({
    name: null,
    lastName: null,
    birth: null,
    telephone: null,
    cellphone: null,
    street: null,
    number: null,
    city: null,
    postalCode: null,
    medicalService: null,
  });

  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const infoUser = {
    name: data.name,
    lastName: data.lastName,
    birth: data.birth,
    telephone: data.telephone,
    cellphone: data.cellphone,
    street: data.street,
    number: data.number,
    city: data.city,
    postalCode: data.postalCode,
  };

  const infoPatient = {
    medicalService: data.medicalService,
  };

  //#region  validations
  const [validations, setValidations] = useState([false, null]);

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

  useEffect(() => {
    validatePatient();

    // console.log('VALIDATIONS useEffect, 1 => ', validations);
  }, [data]);

  let [fail, err] = validations;
  //#endregion

  function handleSubmit(e) {
    e.preventDefault();
    // console.log({ infoUser, infoPatient, patientID });

    try {
      if (fail) {
        Swal.fire({
          icon: 'error',
          title: 'Your form has errors, please check it out.',
        });
      } else {
        dispatch(updatePatient(patientID, infoPatient, infoUser));
        Swal.fire({
          icon: 'success',
          title: 'Patient updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/home/${patientID}`);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, please try again.',
      });
    }
  }

  return (
    <div className={S.container}>
      <div className={S.container2}>
        <form onSubmit={handleSubmit}>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>First Name</label>
              <input
                className={S.input}
                value={data.name}
                placeholder="Name..."
                type="text"
                name="name"
                onChange={handleChange}
              />
              {fail && err['infoUser.name'] && (
                <p>{err['infoUser.name'].msg}</p>
              )}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Last Name</label>
              <input
                className={S.input}
                value={data.lastName}
                placeholder="LastName..."
                type="text"
                name="lastName"
                onChange={handleChange}
              />
              {fail && err['infoUser.lastName'] && (
                <p>{err['infoUser.lastName'].msg}</p>
              )}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Birth</label>
              <input
                className={S.input}
                value={data.birth}
                placeholder="Birth..."
                type="date"
                name="birth"
                onChange={handleChange}
              />
              {fail && err['infoUser.birth'] && (
                <p>{err['infoUser.birth'].msg}</p>
              )}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Telephone</label>
              <input
                className={S.input}
                value={data.telephone}
                placeholder="Telephone..."
                type="text"
                name="telephone"
                onChange={handleChange}
              />
              {fail && err['infoUser.telephone'] && (
                <p>{err['infoUser.telephone'].msg}</p>
              )}
            </div>
          </div>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Cellphone</label>
              <input
                className={S.input}
                value={data.cellphone}
                placeholder="Cellphone..."
                type="text"
                name="cellphone"
                onChange={handleChange}
              />
              {fail && err['infoUser.cellphone'] && (
                <p>{err['infoUser.cellphone'].msg}</p>
              )}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Street</label>
              <input
                className={S.input}
                value={data.street}
                placeholder="Street..."
                type="text"
                name="street"
                onChange={handleChange}
              />
              {fail && err['infoUser.street'] && (
                <p>{err['infoUser.street'].msg}</p>
              )}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Number</label>
              <input
                className={S.input}
                value={data.number}
                placeholder="Number..."
                type="text"
                name="number"
                onChange={handleChange}
              />
              {fail && err['infoUser.number'] && (
                <p>{err['infoUser.number'].msg}</p>
              )}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>City</label>
              <input
                className={S.input}
                value={data.city}
                placeholder="City..."
                type="text"
                name="city"
                onChange={handleChange}
              />
              {fail && err['infoUser.city'] && (
                <p>{err['infoUser.city'].msg}</p>
              )}
            </div>
          </div>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Postal Code</label>
              <input
                className={S.input}
                value={data.postalCode}
                placeholder="Postal Code..."
                type="text"
                name="postalCode"
                onChange={handleChange}
              />
              {fail && err['infoUser.postalCode'] && (
                <p>{err['infoUser.postalCode'].msg}</p>
              )}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Medical Service</label>
              <input
                className={S.input}
                value={data.medicalService}
                placeholder="Medical Service..."
                type="text"
                name="medicalService"
                onChange={handleChange}
              />
              {fail && err['infoPatient.medicalService'] && (
                <p>{err['infoPatient.medicalService'].msg}</p>
              )}
            </div>
          </div>
          <button
            className={S.btn2}
            type="submit"
            style={{ marginTop: '2rem' }}
          >
            <span className={S.transition}></span>
            <span className={S.gradient}></span>
            <span className={S.label} style={{ fontSize: '1.5rem' }}>
              Update Patient
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
