import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import S from './UpdateMedic.module.css';
import { updateMedic } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import bk_validate from '../../../helpers/backend_validators';

export default function UpdateMedicInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ClinicID, setClinicID] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem('loggedToken')).email;
  const [medicId, setMedicId] = useState(null);
  const funcSetMedicID = () =>
    axios
      .get(`/medics/?email=${userEmail}`)
      .then(res => {
        setMedicId(res.data[0].Medic.ID);
        setClinicID(res.data[0].Medic.ClinicID);
        return res.data[0].Medic.ID;
      })
      .catch(err => console.error(err));

  const [data, setData] = useState({
    name: '',
    lastName: '',
    email: '',
    birth: '',
    telephone: '',
    cellphone: '',
    street: '',
    number: '',
    city: '',
    postalCode: '',
    specialization: '',
    tuition_date: '',
  });

  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const infoUser = {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    birth: data.birth,
    telephone: data.telephone,
    cellphone: data.cellphone,
    street: data.street,
    number: data.number,
    city: data.city,
    postalCode: data.postalCode,
  };

  const infoMedic = {
    specialization: data.specialization,
    tuition_date: data.tuition_date,
  };

  //#region  validations
  const [validations, setValidations] = useState([false, null]);

  async function validatePatient() {
    const [fail, err] = await bk_validate.Patient(
      { infoUser, infoMedic },
      medicId
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
    funcSetMedicID();
    console.log('VALIDATIONS useEffect, 1 => ', validations);
  }, [data]);

  let [fail, err] = validations;
  //#endregion

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ infoUser, infoMedic, medicId });

    try {
      if (fail) {
        Swal.fire({
          icon: 'error',
          title: 'Your form has errors, please check it out.',
        });
      } else {
        dispatch(updateMedic(infoMedic, infoUser, ClinicID, medicId));
        Swal.fire({
          icon: 'success',
          title: 'Your information has been updated.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/home`);
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
      <Toaster position='top-center' reverseOrder={false} />
      <div className={S.content}>
        <form className={S.form} onSubmit={handleSubmit}>
          <label className={S.label}>Frist Name</label>
          <input
            value={data.name}
            placeholder='Name...'
            type='text'
            name='name'
            onChange={handleChange}
          />
          {fail && err['infoUser.name'] && <p>{err['infoUser.name'].msg}</p>}
          <label className={S.label}>Last Name</label>
          <input
            value={data.lastName}
            placeholder='LastName...'
            type='text'
            name='lastName'
            onChange={handleChange}
          />
          {fail && err['infoUser.lastName'] && (
            <p>{err['infoUser.lastName'].msg}</p>
          )}
          <label className={S.label}>Email</label>
          <input
            value={data.email}
            placeholder='Email...'
            type='text'
            name='email'
            onChange={handleChange}
          />
          {fail && err['infoUser.email'] && <p>{err['infoUser.email'].msg}</p>}
          <label className={S.label}>Birth</label>
          <input
            value={data.birth}
            placeholder='Birth...'
            type='date'
            name='birth'
            onChange={handleChange}
          />
          {fail && err['infoUser.birth'] && <p>{err['infoUser.birth'].msg}</p>}
          <label className={S.label}>Telephone</label>
          <input
            value={data.telephone}
            placeholder='Telephone...'
            type='text'
            name='telephone'
            onChange={handleChange}
          />
          {fail && err['infoUser.telephone'] && (
            <p>{err['infoUser.telephone'].msg}</p>
          )}
          <label className={S.label}>Cellphone</label>
          <input
            value={data.cellphone}
            placeholder='Cellphone...'
            type='text'
            name='cellphone'
            onChange={handleChange}
          />
          {fail && err['infoUser.cellphone'] && (
            <p>{err['infoUser.cellphone'].msg}</p>
          )}
          <label className={S.label}>Street</label>
          <input
            value={data.street}
            placeholder='Street...'
            type='text'
            name='street'
            onChange={handleChange}
          />
          {fail && err['infoUser.street'] && (
            <p>{err['infoUser.street'].msg}</p>
          )}
          <label className={S.label}>Number</label>
          <input
            value={data.number}
            placeholder='Number...'
            type='text'
            name='number'
            onChange={handleChange}
          />
          {fail && err['infoUser.number'] && (
            <p>{err['infoUser.number'].msg}</p>
          )}
          <label className={S.label}>City</label>
          <input
            value={data.city}
            placeholder='City...'
            type='text'
            name='city'
            onChange={handleChange}
          />
          {fail && err['infoUser.city'] && <p>{err['infoUser.city'].msg}</p>}
          <label className={S.label}>Postal Code</label>
          <input
            value={data.postalCode}
            placeholder='Postal Code...'
            type='text'
            name='postalCode'
            onChange={handleChange}
          />
          {fail && err['infoUser.postalCode'] && (
            <p>{err['infoUser.postalCode'].msg}</p>
          )}
          <label className={S.label}>Specialization </label>
          <input
            value={data.specialization}
            placeholder='Specialization...'
            type='text'
            name='specialization'
            onChange={handleChange}
          />
          {fail && err['infoPatient.specialization'] && (
            <p>{err['infoPatient.specialization'].msg}</p>
          )}
          <label className={S.label}>Tuition Date</label>
          <input
            value={data.tuition_date}
            placeholder='Tuition Date...'
            type='date'
            name='tuition_date'
            onChange={handleChange}
          />
          {fail && err['infoUser.tuition_date'] && (
            <p>{err['infoUser.tuition_date'].msg}</p>
          )}

          <button type='submit' className={S.btn}>
            Update Patient
          </button>
        </form>
        <Link to={`/home`}>
          <button className={S.btnBack}>Cancel</button>
        </Link>
      </div>
    </>
  );
}
