import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './Logo/logo.jpg';
import { Link, useInRouterContext, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import S from './SingUp.module.css';

export function validate(input) {
  let errors = {};
  let medic = {};
  if (!input.email) {
    errors.username = 'El email faltante';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.username = 'El email invalido';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.-*[0-9])/.test(input.password)) {
    errors.password = 'La contraseña es invalida';
  } else if (input.password.length < 8) {
    errors.password = 'La contraseña debe ser mayor a 6 digitos';
  } else if (input.password.length > 16) {
    errors.password = 'La contraseña debe ser menor a 12 digitos';
  }

  if (!input.passwordConfirm) {
    errors.passwordConfirm = 'Debes confirmar tu contraseña';
  } else if (input.password !== input.passwordConfirm) {
    errors.passwordConfirm = 'Las contraseñas no coinciden';
  }
  if (!input.name) {
    errors.name = 'El nombre es requerido';
  } else if (!/^[a-zA-Z\s]/.test(input.name)) {
    errors.name = 'El nombre es invalido';
  }
  if (!input.lastName) {
    errors.lastName = 'El apellido es requerido';
  } else if (!/^[a-zA-Z\s]/.test(input.lastName)) {
    errors.lastName = 'El apellido es invalido';
  }
  if (!input.document) {
    errors.document = 'El documento es requerido';
  } else if (!/^[0-9]+$/.test(input.document)) {
    errors.document = 'El documento es invalido';
  } else if (input.document.length < 7) {
    errors.document = 'El documento es invalido';
  }
  if (!input.birth) {
    errors.birth = 'Año de nacimiento es requerido';
  }
  if (medic === false) {
    if (!input.obraSocial) {
      errors.obraSocial = 'La obra social es requerida';
    } else if (!/^[0-9]+$/.test(input.obraSocial)) {
      errors.obraSocial = 'La obra social es invalida';
    }
  }
  if (medic === true) {
    if (!input.tuition_number) {
      errors.matricula = 'La matricula es requerida';
    } else if (!/^[0-9]+$/.test(input.tuition_number)) {
      errors.matricula = 'La matricula es invalida';
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

  const infoUser = {
    email: input.email,
    password: input.password,
    name: input.name,
    lastName: input.lastName,
    document: parseInt(input.document),
    birth: input.birth,
    userType: 'Medic',
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
  }

  const register = e => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      return toast.error('Debes rellenar todos los campos de forma correcta.');
    } else {
      if (medic === false) {
        axios
          .post('http://localhost:3001/login/register', {
            email: input.email,
            password: input.password,
            userType: 'Patient',
            document: input.document,
            name: input.name,
            lastName: input.lastName,
            birth: input.birth,
          })
          .then(response => {
            toast.success(response.data.success);
            navigate('/');
          })
          .catch(() => {
            return toast.error('Este usuario ya ha sido creado.');
          });
      } else {
        // console.log(infoUser);
        axios
          .post('http://localhost:3001/medics', {
            infoUser: infoUser,
            infoMedic: infoMedic,
            ClinicID: input.ClinicID,
          })
          .then(response => {
            toast.success(response.data.success);
            navigate('/');
          })
          .catch(() => {
            return toast.error('Este usuario ya ha sido creado.');
          });
      }
    }
  };

  return (
    <>
      <SignUpDivContainer>
        <div className={S.check}>
          <label className="switchBtn">
            <input type="checkbox" onClick={toggleOn} />
            {medic === false ? (
              <div className="slide round">
                <p className={S.pa}> Patient </p>
              </div>
            ) : (
              <div className="slide round">
                <p>Medic</p>
              </div>
            )}
          </label>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
        <SignUpContainer>
          <form onSubmit={register}>
            <label>Email</label>
            <input
              onChange={handleInputChange}
              value={input.email}
              placeholder="Email"
              type="text"
              name="email"
            />
            {errors.username && <p className="error">{errors.username}</p>}
            <label>Contraseña</label>
            <input
              onChange={handleInputChange}
              value={input.password}
              placeholder="Password"
              type="password"
              name="password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <label>Confirma tu contraseña</label>
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
            <label>Nombre</label>
            <input
              onChange={handleInputChange}
              value={input.name}
              placeholder="Nombre"
              type="text"
              name="name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <label>Apellido</label>
            <input
              onChange={handleInputChange}
              value={input.lastName}
              placeholder="Apellido"
              type="text"
              name="lastName"
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <label>Documento</label>
            <input
              onChange={handleInputChange}
              value={input.document}
              placeholder="Documento"
              type="text"
              name="document"
            />
            {errors.document && <p className="error">{errors.document}</p>}
            <label>Fecha de nacimiento</label>
            <input
              onChange={handleInputChange}
              value={input.birth}
              placeholder="Email"
              type="date"
              name="birth"
            />
            {errors.birth && <p className="error">{errors.birth}</p>}

            {medic === false ? (
              <>
                <label>N° Obra social</label>
                <input
                  onChange={handleInputChange}
                  value={input.obraSocial}
                  placeholder="Obra social"
                  type="text"
                  name="obraSocial"
                />
                {errors.obraSocial && (
                  <p className="error">{errors.obraSocial}</p>
                )}
              </>
            ) : (
              <>
                <label>Titulo</label>
                <input
                  onChange={handleInputChange}
                  value={input.title}
                  placeholder="Titulo"
                  type="text"
                  name="title"
                />
                <label>Matricula</label>
                <input
                  onChange={handleInputChange}
                  value={input.tuition_number}
                  placeholder="Matricula"
                  type="text"
                  name="tuition_number"
                />
                <label>Fecha matriculado</label>
                <input
                  onChange={handleInputChange}
                  value={input.tuition_date}
                  placeholder="Fecha Matricula"
                  type="date"
                  name="tuition_date"
                />
              </>
            )}

            <button type="submit">Registrarme</button>
          </form>
        </SignUpContainer>
        <Link to="/">
          <button className="back_signUp">VOLVER</button>
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
