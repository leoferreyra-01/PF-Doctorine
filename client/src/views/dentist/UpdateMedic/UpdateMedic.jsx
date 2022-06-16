import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
import S from './UpdateMedic.module.css';
import { updateMedic, getMedicInfo } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import bk_validate from '../../../helpers/backend_validators';

export default function UpdateMedicInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ClinicID, setClinicID] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem('loggedToken')).email;
  const [medicId, setMedicId] = useState(null);
  const medic = useSelector(state => state.searchedMedic);
  console.log(medic);

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
    name: medic.name,
    lastName: medic.lastName,
    email: medic.email,
    birth: medic.birth,
    telephone: medic.telephone,
    cellphone: medic.cellphone,
    street: medic.street,
    number: medic.number,
    city: medic.city,
    postalCode: medic.postalCode,
    specialization: medic.Medic.specialization,
    tuition_date: medic.Medic.tuition_date,
  });

  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }
  if (medic.email === data.email) {
    var infoUser = {
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
  } else {
    // eslint-disable-next-line
    var infoUser = {
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
  }
  const infoMedic = {
    specialization: data.specialization,
    tuition_date: data.tuition_date,
  };

  //#region  validations
  const [validations, setValidations] = useState([false, null]);

  async function validateMedic() {
    const [fail, err] = await bk_validate.Medic(
      { infoUser, infoMedic, ClinicID },
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
    dispatch(getMedicInfo(userEmail));
    validateMedic();
    funcSetMedicID();
    console.log('VALIDATIONS useEffect, 1 => ', validations);
  }, [dispatch, data]);
  // eslint-disable-next-line
  let [fail, err] = validations;
  //#endregion

  function changePassword() {
    navigate('/home/changePassword');
  }

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
    <div className={S.container}>
      <button
        className={S.btn}
        onClick={changePassword}
        style={{ marginBottom: '2rem' }}
      >
        <span className={S.transition}></span>
        <span className={S.gradient}></span>
        <span className={S.label}> Change Password</span>
      </button>
      <div className={S.container2}>
        <form onSubmit={handleSubmit}>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className={S.subtitle}>First Name</div>
              <input
                className={S.input}
                value={data.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.name'] && (
                <p>{err['infoUser.name'].msg}</p>
              )} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className={S.subtitle}>Last Name</div>
              <input
                className={S.input}
                value={data.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.lastName'] && (
                <p>{err['infoUser.lastName'].msg}</p>
              )} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className={S.subtitle}>Email</div>
              <input
                className={S.input}
                value={data.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.email'] && (
                <p>{err['infoUser.email'].msg}</p>
              )} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className={S.subtitle}>Birth</div>
              <input
                className={S.input}
                value={data.birth}
                type="date"
                name="birth"
                onChange={handleChange}
                style={{ marginBottom: '0' }}
              />
            </div>
            {/* {fail && err['infoUser.birth'] && (
                <p>{err['infoUser.birth'].msg}</p>
              )} */}
          </div>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Telephone</label>
              <input
                className={S.input}
                value={data.telephone}
                name="telephone"
                onChange={handleChange}
              />
              {/* {fail && err['infoUser.telephone'] && (
                <p>{err['infoUser.telephone'].msg}</p>
              )} */}
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Cellphone</label>
              <input
                className={S.input}
                value={data.cellphone}
                name="cellphone"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.cellphone'] && (
                <p>{err['infoUser.cellphone'].msg}</p>
              )} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Street</label>
              <input
                className={S.input}
                value={data.street}
                name="street"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.street'] && (
                <p>{err['infoUser.street'].msg}</p>
              )} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Number</label>
              <input
                className={S.input}
                value={data.number}
                name="number"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.number'] && (
                <p>{err['infoUser.number'].msg}</p>
              )} */}
          </div>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>City</label>
              <input
                className={S.input}
                value={data.city}
                name="city"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.city'] && <p>{err['infoUser.city'].msg}</p>} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Postal Code</label>
              <input
                className={S.input}
                value={data.postalCode}
                name="postalCode"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoUser.postalCode'] && (
            <p>{err['infoUser.postalCode'].msg}</p>
          )} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Specialization </label>
              <input
                className={S.input}
                value={data.specialization}
                name="specialization"
                onChange={handleChange}
              />
            </div>
            {/* {fail && err['infoPatient.specialization'] && (
            <p>{err['infoPatient.specialization'].msg}</p>
          )} */}
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <label className={S.subtitle}>Tuition Date</label>
              <input
                className={S.input}
                value={data.tuition_date}
                type="date"
                name="tuition_date"
                onChange={handleChange}
                style={{ marginBottom: '0' }}
              />
            </div>
            {/* {fail && err['infoUser.tuition_date'] && (
            <p>{err['infoUser.tuition_date'].msg}</p>
          )} */}
          </div>
          <button className={S.btn} type="submit" style={{ marginTop: '2rem' }}>
            <span className={S.transition}></span>
            <span className={S.gradient}></span>
            <span className={S.label}> Update My Info</span>
          </button>
        </form>
      </div>
    </div>
  );
}
