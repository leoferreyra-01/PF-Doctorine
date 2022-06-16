import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { postPasswordReset } from '../../redux/actions';
import Swal from 'sweetalert2';
// import S from "./PasswordReset.module.css"

export function validate(input) {
  let errors = {};

  if (!input.email) {
    errors.username = 'Username is required';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.username = 'Username is invalid';
  }
  return errors;
}

function PasswordReset() {
  const [input, setInput] = useState({
    email: '',
  });
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  // eslint-disable-next-line
  const User = useSelector(state => state.user);

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

  const handleSumbit = async e => {
    try {
      e.preventDefault();
      if (Object.keys(errors).length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'User must be completed correctly',
        })
      }
      dispatch(postPasswordReset(input));
      Swal.fire({
        icon: 'success',
        title: 'Check your email box',
        showConfirmButton: true,
      });
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Incorrect User',
      })
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SignUpDivContainer>
        <SignUpContainer>
          <form onSubmit={handleSumbit}>
            <label>Username</label>
            <input
              onChange={handleInputChange}
              value={input.email}
              placeholder="Email"
              type="text"
              name="email"
            />
            {errors.username && <p className="error">{errors.username}</p>}
            <button>Send</button>
          </form>
        </SignUpContainer>

        <Link to="/">
          <button className="back_signUp">Back</button>
        </Link>
      </SignUpDivContainer>
    </>
  );
}

export default PasswordReset;

const SignUpDivContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #07182e;
  object-fit: fill;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .back_signUp {
    margin: 0.2rem;
    padding: 0.5rem;
    border: none;
    background: none;
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    transition: 0.2s ease-in-out;
    letter-spacing: 0.3rem;
  }
  .back_signUp:hover {
    cursor: pointer;
    color: white;
    background: #8893b1b5;
    border-radius: 10px;
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
    box-shadow: 0 5px 10px rgba(235, 235, 235, 0.606);
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
      box-shadow: 0 0 10px #8893b1b5, 0 0 10px #8893b1b5, 0 0 15px #8893b1b5;
      transition: 0.8s;
      border: none;
      color: white;
      background-color: #8893b1b5;
      cursor: pointer;
    }
  }
  span {
    color: #fff;
  }
  h1 {
    color: #fff;
    padding: 10px;
  }
  .link-to-signup {
    align-self: flex-end;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
    transition: 0.2s ease-in-out;
    letter-spacing: 0.2rem;
  }
  .link-to-signup:hover {
    cursor: pointer;
    color: white;
    background: #8893b1b5;
    border-radius: 10px;
  }
  .error {
    color: #b70000;
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
// eslint-disable-next-line
const AuthDiv = styled.div`
  margin-top: -6.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a9c;
  width: 32rem;
  height: 15rem;
  border-radius: 20px;
  margin: 0px auto;
  position: relative;
  h1 {
    position: relativo;
    line-height: 11rem;
  }
  button {
    margin-top: -3rem;
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
      box-shadow: 0 0 10px #8893b1b5, 0 0 10px #8893b1b5, 0 0 15px #8893b1b5;
      transition: 0.8s;
      border: none;
      color: white;
      background-color: #8893b1b5;
      cursor: pointer;
    }
  }
`;
