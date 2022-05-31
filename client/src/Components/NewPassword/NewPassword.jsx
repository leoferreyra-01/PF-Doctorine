import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postNewPassword } from '../../redux/actions';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import S from './NewPassword.module.css';

export function validate(input) {
  let errors = {};
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.-*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  }

  if (!input.passwordConfirm) {
    errors.passwordConfirm = 'Debes confirmar tu contraseña';
  } else if (input.password !== input.passwordConfirm) {
    errors.passwordConfirm = 'Las contraseñas no coinciden';
  }
  return errors;
}

function NewPassword() {
  const query = new URLSearchParams(useLocation().search);
  const username = query.get('usuario');
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: username,
    password: '',
    passwordConfirm: '',
  });
  const navigate = useNavigate();

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

  const register = e => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      return toast.error('Debes rellenar todos los campos de forma correcta.');
    } else {
      console.log('SI ENTRO');
      dispatch(postNewPassword(input));
      navigate('/');
      axios
        .post('http://localhost:3001/newPassword', {
          password: input.password,
        })
        .then(response => {
          console.log(response.data);
          toast.success(response.data);
          navigate('/');
        })
        .catch(() => {
          return toast.error('Este usuario ya ha sido creado.');
        });
    }
  };

  return (
    <>
      <SignUpDivContainer>
        <Toaster position="top-center" reverseOrder={false} />

        <SignUpContainer>
          <form onSubmit={register}>
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
            <button type="submit">Aceptar</button>
          </form>
        </SignUpContainer>

        <Link to="/">
          <button className="back_signUp">INICIO</button>
        </Link>
      </SignUpDivContainer>
    </>
  );
}

export default NewPassword;

const SignUpDivContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: grey;
  object-fit: fill;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
    background-color: #1a1a1a9c;
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
