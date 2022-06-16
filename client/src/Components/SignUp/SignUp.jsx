import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import S from './SingUp.module.css';
import { useDispatch } from 'react-redux';
import { postMedicLogin, postPatientLogin } from '../../redux/actions';
import Swal from 'sweetalert2';

export function validate(input) {
  let errors = {};
  let medic = {};
  if (!input.email) {
    errors.username = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.username = 'Email is invalid';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.-*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  } else if (input.password.length < 8) {
    errors.password = 'Password must be greater than 8 digits';
  } else if (input.password.length > 16) {
    errors.password = 'Password must be less than 16 digits';
  }

  if (!input.passwordConfirm) {
    errors.passwordConfirm = 'Confirm password';
  } else if (input.password !== input.passwordConfirm) {
    errors.passwordConfirm = "Passwords don't match";
  }
  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!/^[a-zA-Z\s]/.test(input.name)) {
    errors.name = 'Name is invalid';
  }
  if (!input.lastName) {
    errors.lastName = 'Lastname is required';
  } else if (!/^[a-zA-Z\s]/.test(input.lastName)) {
    errors.lastName = 'Lastname is invalid';
  }
  if (!input.document) {
    errors.document = 'ID is required';
  } else if (!/^[0-9]+$/.test(input.document)) {
    errors.document = 'ID is invalid';
  } else if (input.document.length < 7) {
    errors.document = 'ID is invalid';
  }
  if (!input.birth) {
    errors.birth = 'Birth date is required';
  }
  if (medic === false) {
    if (!input.obraSocial) {
      errors.obraSocial = 'Medical insurance is required';
    } else if (!/^[0-9]+$/.test(input.obraSocial)) {
      errors.obraSocial = 'Medical insurance is invalid';
    }
  }
  if (medic === true) {
    if (!input.tuition_number) {
      errors.matricula = 'Tuition number is required';
    } else if (!/^[0-9]+$/.test(input.tuition_number)) {
      errors.matricula = 'Tuition number is required';
    }
  }
  return errors;
}

function SignUp() {
  const [input, setInput] = useState({
    email: '',
    name: '',
    lastName: '',
    document: '',
    birth: '',
    password: '',
    obraSocial: '',
    passwordConfirm: '',
    userType: 'Patient',
    title: '',
    tuition_number: '',
    tuition_date: '',
    ClinicID: 1,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const infoUser = {
    email: input.email,
    password: input.password,
    name: input.name,
    lastName: input.lastName,
    document: parseInt(input.document),
    birth: input.birth,
  };

  const infoMedic = {
    title: input.title,
    tuition_number: parseInt(input.tuition_number),
    tuition_date: input.tuition_date,
  };
  const [medic, setMedic] = useState(false);

  const [errors, setErrors] = useState({});
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function toggleOn() {
    if (medic === true) {
      setMedic(false);
    } else {
      setMedic(true);
    }

    console.log(medic);
  }

  const register = e => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      return Swal.fire({
        icon: 'error',
        title: 'All fields must be completed correctly',
      });
    } else {
      if (medic === false) {
        try {
          dispatch(
            postPatientLogin({
              infoUser: infoUser,
              infoPatient: input.obraSocial,
            })
          );
          Swal.fire({
            icon: 'success',
            title: 'Registered successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'This user already exists',
          });
        }
      } else {
        console.log(infoUser);
        try {
          dispatch(
            postMedicLogin({
              infoUser: infoUser,
              infoMedic: infoMedic,
              ClinicID: input.ClinicID,
            })
          );
          Swal.fire({
            icon: 'success',
            title: 'Registered successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
        } catch (error) {
          return Swal.fire({
            icon: 'error',
            title: 'This user already exists',
          });
        }
      }
    }
  };

  return (
    <>
      <SignUpDivContainer>
        <div className={S.check}>
          <label class="switchBtn">
            <input type="checkbox" onClick={toggleOn} />
            {medic === false ? (
              <div class="slide round">
                <p className={S.pa}> Patient </p>
              </div>
            ) : (
              <div class="slide round">
                <p>Medic</p>
              </div>
            )}
          </label>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
        <SignUpContainer>
          <form onSubmit={register}>
            <label className={S.label}>Email</label>
            <input
              onChange={handleInputChange}
              value={input.email}
              placeholder="Email"
              type="text"
              name="email"
            />
            {errors.username && <p className="error">{errors.username}</p>}
            <label className={S.label}>Password</label>
            <input
              onChange={handleInputChange}
              value={input.password}
              placeholder="Password"
              type="password"
              name="password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <label className={S.label}>Confirm password</label>
            <input
              onChange={handleInputChange}
              value={input.passwordConfirm}
              placeholder="Password"
              type="password"
              name="passwordConfirm"
            />
            {errors.passwordConfirm && (
              <p className="error">{errors.passwordConfirm}</p>
            )}
            <label className={S.label}>Name</label>
            <input
              onChange={handleInputChange}
              value={input.name}
              placeholder="Name"
              type="text"
              name="name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <label className={S.label}>Lastname</label>
            <input
              onChange={handleInputChange}
              value={input.lastName}
              placeholder="Lastname"
              type="text"
              name="lastName"
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <label className={S.label}>ID</label>
            <input
              onChange={handleInputChange}
              value={input.document}
              placeholder="ID"
              type="text"
              name="document"
            />
            {errors.document && <p className="error">{errors.document}</p>}
            <label className={S.label}>Birth date</label>
            <input
              onChange={handleInputChange}
              value={input.birth}
              placeholder="Birth date"
              type="date"
              name="birth"
            />
            {errors.birth && <p className="error">{errors.birth}</p>}

            {medic === false ? (
              <>
                <label className={S.label}>N° medical insurance</label>
                <input
                  onChange={handleInputChange}
                  value={input.obraSocial}
                  placeholder="Medical insurance"
                  type="text"
                  name="obraSocial"
                />
                {errors.obraSocial && (
                  <p className="error">{errors.obraSocial}</p>
                )}
              </>
            ) : (
              <>
                <label className={S.label}>Title</label>
                <input
                  onChange={handleInputChange}
                  value={input.title}
                  placeholder="Title"
                  type="text"
                  name="title"
                />
                <label className={S.label}>Tuition</label>
                <input
                  onChange={handleInputChange}
                  value={input.tuition_number}
                  placeholder="Tuition"
                  type="text"
                  name="tuition_number"
                />
                <label className={S.label}>Tuition date</label>
                <input
                  onChange={handleInputChange}
                  value={input.tuition_date}
                  placeholder="Tuition date"
                  type="date"
                  name="tuition_date"
                />
              </>
            )}

            <button type="submit">Register</button>
          </form>
        </SignUpContainer>
        <Link to="/">
          <button className="back_signUp">Back</button>
        </Link>
      </SignUpDivContainer>
    </>
  );
}

export default SignUp;

const SignUpDivContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 148vh;
  width: 100%;
  background-color: #07182e;
  object-fit: fill;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .switchBtn {
    margin-top: -20px;
    position: relative;
    display: flex;
    justify-content: left;
    width: 170px;
    height: 34px;
  }
  .switchBtn input {
    display: none;
  }
  .slide {
    justify-content: space-around;
    cursor: pointer;
    width: 100px;
    bottom: 0;
    background-color: #219ed8;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    padding: 7px;
    color: #fff;
    display: flex;
    justify-content: space-around;
    margin-right: 70px;
  }
  .slide:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 72px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  input:checked + .slide {
    background-color: #8ce196;
    padding-left: 40px;
  }
  input:focus + .slide {
    box-shadow: 0 0 1px #01aeed;
  }
  input:checked + .slide:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    left: -20px;
  }
  .slide.round {
    border-radius: 34px;
  }
  .slide.round:before {
    border-radius: 50%;
  }
  .back_signUp {
    margin: 0.2rem;
    padding: 0.5rem;
    border: none;
    background: none;
    color: #fffdfd;
    font-size: 1.2rem;
    transition: 0.2s ease-in-out;
    letter-spacing: 0.3rem;
  }

  .back_signUp:hover {
    cursor: pointer;
    color: #8893b1;
  }
  @media (max-width: 455px) {
    height: 125vh;
    width: 125%;
    object-fit: fill;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
// eslint-disable-next-line
const ImgSignUp = styled.div`
  margin-top: -2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 455px) {
    width: 150px;
  }
`;

const SignUpContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    font-family: 'Poppins', sans-serif;
  }
  label {
    padding-top: 10px;
    margin-top: 0.5rem;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.2rem;
  }
  form {
    margin-top: -4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(0, 131, 182);
    box-shadow: 15px 15px 30px rgba(255, 255, 255, 0.129),
      -15px -15px 30px rgba(255, 255, 255, 0.135);
    -webkit-backdrop-filter: blur(7px);
    width: 32rem;
    height: auto;
    border-radius: 20px;
  }
  input {
    width: 250px;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    padding: 10px;
    border: 0.1px solid #dfdfdf;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(214, 214, 214, 0.397);
    &:focus {
      outline: none;
    }
  }
  .error {
    color: red;
    font-size: 1.5rem;
    font-weight: 600;
  }
  button {
    margin: 25px 0 25px 0;
    background-color: #ededed;
    padding: 5px 20px;
    color: #414141;
    letter-spacing: 2px;
    text-decoration: none;
    font-size: 15px;
    transition: 0.1s;
    border-radius: 5px;
    border: none;
    left: 70px;
    box-shadow: 0 5px 10px rgba(255, 255, 255, 0.568);
    &:hover {
      color: black;
      box-shadow: 0 0 10px #9088a0, 0 0 10px #9088a0, 0 0 15px #9088a0;
      transition: 0.8s;
      border: none;
      color: white;
      background-color: #9088a0;
      cursor: pointer;
    }
  }
  @media (max-width: 455px) {
    form {
      width: 20rem;
    }
    input {
      width: 180px;
    }
  }
`;
