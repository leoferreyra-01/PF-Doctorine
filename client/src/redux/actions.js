import axios from 'axios';
import toast from 'react-hot-toast'; //Esto tambien del login
export const GET_PATIENT = 'GET_PATIENT';
export const CLEAR = 'CLEAR';
export const POST_TURN = 'POST_TURN';
export const GET_TURNS = 'GET_TURNS';
export const GET_ALL_PATIENTS = 'GET_ALL_PATIENTS';
//login
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTH_SWITCH = 'AUTH_SWITCH';
export const GET_USERS = 'GET_USERS';
export const USER_TO_ADMIN = 'USER_TO_ADMIN';
export const DELETE_USER = 'DELETE_USER';
export const GET_SUCCESS = 'GET_SUCCESS';
export const ENTER_HOME = 'ENTER_HOME';

export function getPatient(id) {
  return function (dispatch) {
    // return axios.get(`http://localhost:3001/recipes/?id=${id}`)
    //     .then(res => dispatch({ type: GET_PATIENT, payload: res.data }))
    //     .catch(error => {
    //         if (error.response.status === 404) return alert(error.response.data.msg)
    //         alert(error.message)
    //     })
    console.log('ACTION');
  };
}

export function getAllPatients() {
  return function (dispatch) {
    // return axios.get(`http://localhost:3001/allPatients`)
    //     .then(res => dispatch({ type: GET_ALL_PATIENTS, payload: res.data }))
    //     .catch(error => {
    //         if (error.response.status === 404) return alert(error.response.data.msg)
    //         alert(error.message)
    //     })
  };
}

export function clear() {
  return {
    type: CLEAR,
  };
}

export function postTurn(payload) {
  return async function () {
    return axios.post(`http://localhost:3001/turn`, payload).catch(error => {
      if (error.response.status === 404) return alert(error.response.data.msg);
      alert(error.message);
    });
  };
}

//LOGIN
export function userDelete(id) {
  return async function (dispatch) {
    await fetch('https://back-mode-parfum.herokuapp.com/deleteUser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  };
}

export function userToAdmin(id) {
  return async function (dispatch) {
    let json = await axios.post('/userToAdmin', id);
    return dispatch({
      type: USER_TO_ADMIN,
      payload: json.data,
    });
  };
}

export function getSuccess(payload) {
  return async function (dispatch) {
    let token2 = JSON.parse(window.localStorage.getItem('loggedToken'));
    try {
      console.log(token2.token);
      console.log(payload);
      const json = await axios.get('/success?payment_id=' + payload, {
        headers: {
          Authorization: `Bearer ${token2.token}`,
        },
      });
      // console.log('json',json)
      return dispatch({
        type: GET_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loginUser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post('/login', payload);
      console.log(json.data);
      return dispatch({ type: LOGIN_USER, info: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function logOut() {
  return { type: LOGOUT_USER };
}
export function login() {
  return { type: LOGIN_USER };
}

export function postPasswordReset(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post('/passwordReset', payload);
      if (response.data.error) {
        console.log('ESTO ES RESPONSE: ', response.data);
        return toast.error(response.data.error);
      } else {
        toast.success(
          'Revisa tu casilla de mensajes en tu correo electronico.'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function postNewPassword(payload) {
  console.log('PAYLOAD: ', payload);
  return async function (dispatch) {
    try {
      const response = await axios.post('/newPassword', payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function authSwitch() {
  return {
    type: AUTH_SWITCH,
  };
}

export function getUsers() {
  return async function (dispatch) {
    const users = await axios.get('/allUsers');
    return dispatch({
      type: GET_USERS,
      payload: users.data,
    });
  };
}

export function getTurns() {}

export function home(selectedHome) {
  return {
    type: ENTER_HOME,
    payload: selectedHome,
  };
}
