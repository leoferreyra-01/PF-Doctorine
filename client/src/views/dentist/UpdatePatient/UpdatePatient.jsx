import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import S from './UpdatePatient.module.css';
import { updatePatient } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import bk_validate from '../../../helpers/backend_validators';

export default function UpdatePatient() {
  const { patientID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    lastName: '',
    birth: '',
    telephone: '',
    cellphone: '',
    street: '',
    number: '',
    city: '',
    postalCode: '',
    medicalService: '',
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
    console.log('VALIDATIONS Fun, 2 => ', validations);
  }

  useEffect(() => {
    validatePatient();

    console.log('VALIDATIONS useEffect, 1 => ', validations);
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
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={S.content}>
        <form className={S.form} onSubmit={handleSubmit}>
          <label className={S.label}>Frist Name</label>
          <input
            value={data.name}
            placeholder="Name..."
            type="text"
            name="name"
            onChange={handleChange}
          />
          {fail && err['infoUser.name'] && <p>{err['infoUser.name'].msg}</p>}
          <label className={S.label}>Last Name</label>
          <input
            value={data.lastName}
            placeholder="LastName..."
            type="text"
            name="lastName"
            onChange={handleChange}
          />
          {fail && err['infoUser.lastName'] && (
            <p>{err['infoUser.lastName'].msg}</p>
          )}
          <label className={S.label}>Birth</label>
          <input
            value={data.birth}
            placeholder="Birth..."
            type="date"
            name="birth"
            onChange={handleChange}
          />
          {fail && err['infoUser.birth'] && <p>{err['infoUser.birth'].msg}</p>}
          <label className={S.label}>Telephone</label>
          <input
            value={data.telephone}
            placeholder="Telephone..."
            type="text"
            name="telephone"
            onChange={handleChange}
          />
          {fail && err['infoUser.telephone'] && (
            <p>{err['infoUser.telephone'].msg}</p>
          )}
          <label className={S.label}>Cellphone</label>
          <input
            value={data.cellphone}
            placeholder="Cellphone..."
            type="text"
            name="cellphone"
            onChange={handleChange}
          />
          {fail && err['infoUser.cellphone'] && (
            <p>{err['infoUser.cellphone'].msg}</p>
          )}
          <label className={S.label}>Street</label>
          <input
            value={data.street}
            placeholder="Street..."
            type="text"
            name="street"
            onChange={handleChange}
          />
          {fail && err['infoUser.street'] && (
            <p>{err['infoUser.street'].msg}</p>
          )}
          <label className={S.label}>Number</label>
          <input
            value={data.number}
            placeholder="Number..."
            type="text"
            name="number"
            onChange={handleChange}
          />
          {fail && err['infoUser.number'] && (
            <p>{err['infoUser.number'].msg}</p>
          )}
          <label className={S.label}>City</label>
          <input
            value={data.city}
            placeholder="City..."
            type="text"
            name="city"
            onChange={handleChange}
          />
          {fail && err['infoUser.city'] && <p>{err['infoUser.city'].msg}</p>}
          <label className={S.label}>Postal Code</label>
          <input
            value={data.postalCode}
            placeholder="Postal Code..."
            type="text"
            name="postalCode"
            onChange={handleChange}
          />
          {fail && err['infoUser.postalCode'] && (
            <p>{err['infoUser.postalCode'].msg}</p>
          )}
          <label className={S.label}>Medical Service</label>
          <input
            value={data.medicalService}
            placeholder="Medical Service..."
            type="text"
            name="medicalService"
            onChange={handleChange}
          />
          {fail && err['infoPatient.medicalService'] && (
            <p>{err['infoPatient.medicalService'].msg}</p>
          )}

          <button type="submit" className={S.btn}>
            Update Patient
          </button>
        </form>
        <Link to={`/home/${patientID}`}>
          <button className={S.btnBack}>Cancel</button>
        </Link>
      </div>
    </>
  );
}
