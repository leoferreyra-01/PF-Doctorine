import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from './Logo/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import service from '../services/login';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import S from './SingIn.module.css';
import { home, getPatientDni2 } from '../../redux/actions';
import Swal from 'sweetalert2';

export function validate(input) {
  let errors = {};
  // console.log(errors);

  if (!input.email) {
    errors.username = 'Username is required';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.username = 'Username is invalid';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.-*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  } else if (input.password.length < 6) {
    errors.password = 'Password must be greater than 6 digits';
  } else if (input.password.length > 12) {
    errors.password = 'Password must be less than 12 digits';
  }
  return errors;
}

function SignUp() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  const User = useSelector(state => state.user);
  const navigate = useNavigate();

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

  let select = 'medic';

  const handleSumbit = async e => {
    try {
      e.preventDefault();
      if (Object.keys(errors).length > 0) {
        // toast.error('Fields must be completed correctly');
        Swal.fire({
          icon: 'error',
          title: 'Fields must be completed correctly',
        });
      }
      const user = await service.login(input);
      // console.log(user);
      setUser(user);
      window.localStorage.setItem('loggedToken', JSON.stringify(user));
      service.setToken(user.token);
      if (user.token) {
        if (user.userType === 'Patient') {
          select = 'patient';
          // toast.success(`Welcome to the main page ${user.name}`);
          setTimeout(() => {
            Swal.fire({
              title: `Welcome to the main page ${user.name}`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
          }, [2000]);
          dispatch(home(select));
          dispatch(getPatientDni2(user.document));
          window.localStorage.setItem('user', JSON.stringify(user));
          navigate('/home');
        } else {
          // toast.success(
          //   `Welcome to the main page Dr. ${user.name[0]}. ${user.lastName}`
          // );
          setTimeout(() => {
            Swal.fire({
              title: `Welcome to the main page Dr. ${user.name[0]}. ${user.lastName}`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
          }, [2000]);
          dispatch(home(select));
          navigate('/home');
        }
      }
      // console.log(user);
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Incorrect username or password',
      });
      // toast.error('Wrong password or user');
    }
  };
  const respuestaGoogle = async respuesta => {
    console.log(respuesta);
    const register = await axios.post('/login/oneUser', {
      email: respuesta.profileObj.email,
    });
    if (register.data.hasOwnProperty('success')) {
      setInput({
        ...input,
        email: respuesta.profileObj.email,
        password: '',
      });
      Swal.fire({
        icon: 'warning',
        title: 'Please, complete with your password',
      });
    } else {
      const doc = respuesta.googleId;
      const infoUser = {
        email: respuesta.profileObj.email,
        password: respuesta.profileObj.givenName.slice(0,1).toUpperCase() +respuesta.profileObj.givenName.slice(2) + doc.slice(0,7),
        userType: 'Patient',
        document: doc.slice(0, 7),
        name: respuesta.profileObj.givenName,
        lastName: respuesta.profileObj.familyName,
        birth: '1997-02-15',
      };
      const userRegister = await axios.post('/patients', { infoUser });
      console.log(infoUser.password);
      setTimeout(async () => {
        const user = await axios.post('/login', {
          email: respuesta.profileObj.email,
          password: respuesta.profileObj.givenName + doc.slice(0,7),
        });
        window.localStorage.setItem('loggedToken', JSON.stringify(user.data));
        service.setToken(user.data.token);
        if (user.data.token) {
          setTimeout(() => {
            Swal.fire({
              title: `Welcome to the main page ${user.data.name}`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
          }, [2000]);
          setTimeout(() => {
            Swal.fire({
              icon: 'warning',
              title: 'Hello!',
              text: 'Please complete your information!',
              footer: '<a href="">Do you have doubts ?</a>',
            });
          }, 2500);
          navigate('/home/dataUpdate');
        }
      }, 3000);
    }
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <SignUpDivContainer>
        <ImgSignUp>
          <div className={S.card}>
            <img className={S.img} src={logo} alt='logo' />
          </div>
        </ImgSignUp>

        <SignUpContainer>
          <form onSubmit={handleSumbit}>
            <label>Username</label>
            <input
              onChange={handleInputChange}
              value={input.email}
              placeholder='Email'
              type='text'
              name='email'
              className='input-usuario'
            />
            {errors.email && <p className='error'>{errors.email}</p>}

            <label>Password</label>
            <input
              onChange={handleInputChange}
              value={input.password}
              placeholder='Password'
              type='password'
              name='password'
              className='input-usuario'
            />
            {errors.password && <p className='error'>{errors.password}</p>}
            <button>Login</button>
            <hr className='linea' />
            <GoogleLogin
              clientId='909615731637-in2a5sb985nndpniessv5trc4ph926q7.apps.googleusercontent.com'
              buttonText='Login with Google'
              onSuccess={respuestaGoogle}
              onFailure={() => console.log('fail')}
              cookiePolicy={'single_host_origin'}
              className='Google-button'
              style={{ color: 'black important!' }}
            />
            <div className='OR' style={{ position: 'relative', top: '-1rem' }}>
              <Link
                className='link-to-signup'
                id='olv-ct'
                to={'/PasswordReset'}>
                Forgot your password?
              </Link>

              <Link className='link-to-signup' id='register' to={'/SignUp'}>
                Register
              </Link>
            </div>
          </form>
        </SignUpContainer>
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
    background: #009ce5;
    border-radius: 10px;
  }
  @media (max-width: 540px) {
    height: 125vh;
    width: 125%;
    object-fit: fill;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .img-black {
      width: 250px;
      margin-bottom: 100px;
    }
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
    color: black;
  }
  .linea {
    width: 15rem;
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
    color: red;
  }
  @media (max-width: 455px) {
    form {
      width: 20rem;
    }
    input {
      width: 180px;
    }
    .OR {
      display: flex;
      flex-direction: column;
      #register {
        right: 3rem;
      }
    }
  }
  @media (max-width: 375px) {
    .OR {
      display: flex;
      flex-direction: column;
      #register {
        right: 3rem;
      }
    }
  }
  @media (max-width: 280px) {
    form {
      width: 15rem;
    }
    input {
      width: 130px;
    }
    .OR {
      display: flex;
      flex-direction: column;
      #register {
        right: 2rem;
      }
      #olv-ct {
        text-align: center;
        position: relative;
        right: -0.4rem;
      }
    }
    .Google-button {
      width: 8.5rem;
      height: 4rem;
      font-size: 10px;
    }
    .input-usuario {
      text-align: center;
    }
    .linea {
      width: 8.3rem;
    }
  }
`;

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
