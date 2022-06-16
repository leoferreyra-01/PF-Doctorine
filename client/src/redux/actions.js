import axios from 'axios';
import Swal from 'sweetalert2'; //Esto tambien del login
export const ENTER_HOME = 'ENTER_HOME';
export const GET_PATIENT = 'GET_PATIENT';
export const GET_PATIENT_INFO = 'GET_PATIENT_INFO';
export const POST_PATIENT = 'POST_PATIENT';
export const GET_STUDIES = 'GET_STUDIES';
export const GET_BUDGETS = 'GET_BUDGETS';
export const GET_PATIENT_BUDGETS = 'GET_PATIENT_BUDGETS';
export const GET_BUDGETS_DNI = 'GET_BUDGETS_DNI';
export const GET_BUDGETS_NAME = 'GET_BUDGETS_NAME';
export const POST_BUDGET = 'POST_BUDGET';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const ORDER_BUDGETS_BY_NAME_ASC = 'ORDER_BUDGETS_BY_NAME_ASC';
export const ORDER_BUDGETS_BY_NAME_DES = 'ORDER_BUDGETS_BY_NAME_DES';
export const ORDER_BUDGETS_BY_DATE_ASC = 'ORDER_BUDGETS_BY_DATE_ASC';
export const ORDER_BUDGETS_BY_DATE_DES = 'ORDER_BUDGETS_BY_DATE_DES';
export const ORDER_BUDGETS_BY_PRICE_ASC = 'ORDER_BUDGETS_BY_PRICE_ASC';
export const ORDER_BUDGETS_BY_PRICE_DES = 'ORDER_BUDGETS_BY_PRICE_DES';
export const FILTER_BUDGETS_BY_PENDING = 'FILTER_BUDGETS_BY_PENDING';
export const FILTER_BUDGETS_BY_COMPLETED = 'FILTER_BUDGETS_BY_COMPLETED';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const UPDATE_MEDIC_INFO = 'UPDATE_MEDIC_INFO';
export const POST_MEDIC_LOGIN = 'POST_MEDIC_LOGIN';
export const POST_PATIENT_LOGIN = 'POST_PATIENT_LOGIN';
export const GET_EVOLUTIONS = 'GET_EVOLUTIONS';
export const POST_EVOLUTION = 'POST_EVOLUTION';
export const POST_PASSWORDUPDATE = 'POST_PASSWORDUPDATE';
export const GET_MEDIC_INFO = 'GET_MEDIC_INFO';
//export const GET_STUDY = 'GET_STUDY';
export const GET_PATIENT_NAME = 'GET_PATIENT_NAME';
export const GET_PATIENT_DNI2 = 'GET_PATIENT_DNI2';
export const GET_PATIENT_DNI = 'GET_PATIENT_DNI';
export const CLEAR = 'CLEAR';
export const GET_ALL_PATIENTS = 'GET_ALL_PATIENTS';
export const GET_CLINICAL_HISTORY = 'GET_CLINICAL_HISTORY';
export const POST_CLINICAL_HISTORY = 'POST_CLINICAL_HISTORY';
export const GET_CLINICAL_HISTORY_FOR_CREATE =
  'GET_CLINICAL_HISTORY_FOR_CREATE';
export const GET_CLINIC = 'GET_CLINIC';
export const CREATE_CLINIC = 'CREATE_CLINIC';
export const POST_CLINIC = 'POST_CLINIC';
export const UPDATE_CLINIC = 'UPDATE_CLINIC';
export const GET_TOOTH = 'GET_TOOTH';
export const GET_TREATMENTS = 'GET_TREATMENTS';
export const UPDATE_TREATMENT = 'UPDATE_TREATMENT';
export const DELETE_TREATMENT = 'DELETE_TREATMENT';
//--------------------LOGIN-----------------------//
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTH_SWITCH = 'AUTH_SWITCH';
export const GET_USERS = 'GET_USERS';
export const USER_TO_ADMIN = 'USER_TO_ADMIN';
export const DELETE_USER = 'DELETE_USER';
export const GET_SUCCESS = 'GET_SUCCESS';
//--------------------TURNERO-----------------------//
export const GET_TURNS = 'GET_TURNS';
export const POST_TURN = 'POST_TURN';
export const DELETE_TURN = 'DELETE_TURN';
export const GET_INFO_CLINIC = 'GET_INFO_CLINIC'; // (officeHours, turnStandardDuration)
export const GET_MEDICS = 'GET_MEDICS';
//-------------------------------------------------//

export function getUrlStudies(url) {
  return { type: 'POST_URL', payload: url };
}

export function getPatient(patient) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/patients/${patient}`);
      dispatch({ type: GET_PATIENT_INFO, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPatient(patient) {
  return async function (dispatch) {
    try {
      const patientWithId = (await axios.post('/patients', patient)).data;
      return dispatch({ type: POST_PATIENT, payload: patientWithId });
    } catch (error) {
      if (error.response.status === 404) {
        return Swal.fire({
          icon: 'warning',
          title: 'Welcome!',
          text: 'There are no Patients loaded in your database :(',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  };
}

export function getPatientDni(dni) {
  return { type: GET_PATIENT_DNI, payload: dni };
}

//export function getPatientDni(dni) {
// return async function (dispatch) { //Forma de buscar en el back
//   try {
//     const patient = (
//       await axios.get(`/patients?document=${dni}`)
//     ).data;
//     dispatch({ type: GET_PATIENT_DNI, payload: patient });
//   } catch (error) {
//     if (error.response.status === 404) return alert(error.response.data.msg);
//     alert(error.message);
//   }
// };
//}

export function getPatientName(name) {
  return { type: GET_PATIENT_NAME, payload: name };
}

export function getPatientDni2(dni) {
  return async function (dispatch) {
    try {
      const patient = (await axios.get(`/patients?document=${dni}`)).data;
      console.log(patient);
      dispatch({ type: GET_PATIENT_DNI2, payload: { patient } });
    } catch (error) {
      if (error.response.status === 404) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.msg,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  };
}

export function getPatientBudgets(patientID) {
  return async function (dispatch) {
    try {
      const budgets = (await axios.get(`Budgets/?PatientID=${patientID}`)).data;
      dispatch({ type: GET_PATIENT_BUDGETS, payload: budgets });
    } catch (error) {
      //[true, { error: { msg: error.message } }]
      console.log(error);
      console.log('Error joto', error.response.data[1].error.msg);
      if (
        error.response.data[1].error.msg ===
        'There is no budget with that patient!'
      ) {
        dispatch({ type: GET_PATIENT_BUDGETS, payload: [] });
      }
    }
  };
}

export function getAllPatients() {
  return function (dispatch) {
    return axios
      .get(`/patients`)
      .then(res => dispatch({ type: GET_ALL_PATIENTS, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404) {
          console.log(error.response.data.msg);
          // return Swal.fire({
          //   icon: 'warning',
          //   title: 'Welcome!',
          //   text: 'There are no Patients loaded in your database :(',
          // });
        } else {
          console.log(error.message);
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error',
          //   text: error.message,
          // });
        }
      });
  };
}

export function getAllBudgets() {
  return function (dispatch) {
    return axios
      .get(`/Budgets`)
      .then(res => dispatch({ type: GET_BUDGETS, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404) {
          return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.msg,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      });
  };
}

export function getBudgetsDni(dni) {
  return { type: GET_BUDGETS_DNI, payload: dni };
}

export function getBudgetsName(name) {
  return { type: GET_BUDGETS_NAME, payload: name };
}

export function orderBudgetsByHigherPrice() {
  return { type: ORDER_BUDGETS_BY_PRICE_ASC };
}

export function orderBudgetsByLowerPrice() {
  return { type: ORDER_BUDGETS_BY_PRICE_DES };
}

export function orderBudgetsByRecentDate() {
  return { type: ORDER_BUDGETS_BY_DATE_ASC };
}

export function orderBudgetsByOlderDate() {
  return { type: ORDER_BUDGETS_BY_DATE_DES };
}

export function orderBudgetsByNameAsc() {
  return { type: ORDER_BUDGETS_BY_NAME_ASC };
}

export function orderBudgetsByNameDes() {
  return { type: ORDER_BUDGETS_BY_NAME_DES };
}

export function filterPendingBudgets() {
  return { type: FILTER_BUDGETS_BY_PENDING };
}

export function filterCompletedBudgets() {
  return { type: FILTER_BUDGETS_BY_COMPLETED };
}

export function postBudget(budget) {
  return async function (dispatch) {
    try {
      const { patientFullName, patientDocument, ...restOfBudget } = budget;
      const budgetWithID = (await axios.post('/Budgets', restOfBudget)).data;
      const { linkPayment, id } = (
        await axios.post('/payments/create_preference', budgetWithID)
      ).data;
      await axios.put('/Budgets', {
        ID: budgetWithID.ID,
        linkPayment,
        idPayment: id,
      });
      const frontBudget = {
        ...budgetWithID,
        linkPayment,
        patientFullName,
        patientDocument,
        idPayment: id,
      };
      return dispatch({ type: POST_BUDGET, payload: frontBudget });
    } catch (error) {
      if (error.response.status === 404) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.msg,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  };
}

export function updateBudget(budget) {
  return async function (dispatch) {
    try {
      console.log(budget);
      await axios.put('/Budgets', budget);
      return dispatch({ type: UPDATE_BUDGET, payload: budget });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };
}

export function clear() {
  return {
    type: CLEAR,
  };
}

export function postStudy(payload) {
  console.log(payload);
  return async function () {
    return axios.post(`/studies`, payload).catch(error => {
      if (error.response.status === 404) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.msg,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    });
  };
}

//LOGIN
// export function userDelete(id) {
//   return async function (dispatch) {
//     await fetch('https://back-mode-parfum.herokuapp.com/deleteUser', { // Hay que actualizar el link del axios.
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(id),
//     });
//     dispatch({
//       type: DELETE_USER,
//       payload: id,
//     });
//   };
// }

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

// export function logOut() {
//   return { type: LOGOUT_USER };
// }
// export function login() {
//   return { type: LOGIN_USER };
// }

export function postPasswordReset(email) {
  return async function (dispatch) {
    try {
      console.log(email);
      const response = await axios.post('/password/reset', email);
      if (response.data.error) {
        console.log('ESTO ES RESPONSE: ', response.data);
        return Swal.fire({
          icon: 'error',
          title: response.data.error,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Go check your email!',
        });
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

export function home(selectedHome) {
  return {
    type: ENTER_HOME,
    payload: selectedHome,
  };
}

export function getClinicalHistory(id) {
  return async function (dispatch) {
    return axios
      .get(`/clinicalhistories/search?id=${id}`)
      .then(res => dispatch({ type: GET_CLINICAL_HISTORY, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404) {
          return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.msg,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      });
  };
}

export function getEvolutions(patientID) {
  return async dispatch => {
    try {
      const evolution = (await axios.get(`/evolutions?PatientID=${patientID}`))
        .data;
      return dispatch({ type: GET_EVOLUTIONS, payload: evolution });
    } catch (error) {
      if (error.response.status === 404) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.msg,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  };
}

export function postEvolution(evolution) {
  return async function () {
    try {
      return await axios.post('/evolutions', evolution);
    } catch (error) {
      return Swal.fire({
        icon: 'error',
        title: error.message,
      });
    }
  };
}

export function getStudies(patientID) {
  return async dispatch => {
    try {
      const study = (await axios.get(`/studies/search?id=${patientID}`)).data;
      return dispatch({ type: GET_STUDIES, payload: study });
    } catch (error) {
      if (error.response.status === 404) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.msg,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  };
}

export function postClinicalHistory(payload) {
  return async function () {
    try {
      return await axios.post('/clinicalhistories', payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTreatments() {
  return async function (dispatch) {
    try {
      const treatments = (await axios.get('/treatments')).data;
      return dispatch({ type: GET_TREATMENTS, payload: treatments });
    } catch (e) {
      console.log(e);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.response.data.error,
      });
    }
  };
}

export function updateTreatment(treatment) {
  return async function (dispatch) {
    try {
      await axios.put(`/treatments`, treatment);
      return dispatch({ type: UPDATE_TREATMENT, payload: treatment });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTooth() {
  return async function (dispatch) {
    try {
      const tooth = (await axios.get('/tooth')).data;
      return dispatch({ type: GET_TOOTH, payload: tooth });
    } catch (e) {
      console.log(e);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.response.data.error,
      });
    }
  };
}

export function updatePatient(ID, infoPatient, infoUser) {
  return async function (dispatch) {
    return axios
      .put(`/patients/${ID}`, {
        ID: ID,
        infoUser: infoUser,
        infoPatient: infoPatient,
      })
      .then(res => dispatch({ type: UPDATE_PATIENT, payload: res.data }))
      .catch(error => {
        if (error.response.status === 404) {
          return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.msg,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      });
  };
}

export function postMedicLogin({ infoUser, infoMedic, ClinicID }) {
  return async function (dispatch) {
    try {
      const medics = (
        await axios.post('/medics', { infoUser, infoMedic, ClinicID })
      ).data;
      return dispatch({ type: POST_MEDIC_LOGIN, payload: medics });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPatientLogin({ infoUser, infoPatient }) {
  return async function (dispatch) {
    try {
      const patient = (await axios.post('/patients', { infoUser, infoPatient }))
        .data;
      return dispatch({ type: POST_PATIENT_LOGIN, payload: patient });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postClinic(clinic) {
  return async function (dispatch) {
    try {
      const clinicWithID = (await axios.post('/Clinics', clinic)).data;
      return dispatch({ type: POST_CLINIC, payload: clinicWithID });
    } catch (error) {
      console.log(error);
    }
  };
}

//--------------------TURNERO-----------------------//
export function getMedics() {
  return async function (dispatch) {
    try {
      const medics = (await axios.get('/medics')).data;
      return dispatch({ type: GET_MEDICS, payload: medics });
    } catch (e) {
      console.log(e);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.response.data.error,
      });
    }
  };
}

export function getTurns() {
  return async function (dispatch) {
    try {
      const turns = (await axios.get('/turns')).data;
      return dispatch({ type: GET_TURNS, payload: turns });
    } catch (err) {
      console.log(err);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data.msg,
      });
    }
  };
}

export function postTurn(payload) {
  return async function (dispatch) {
    // console.log(payload);
    try {
      await axios.post(`/turns`, payload);

      const allTurns = (await axios.get('/turns')).data;
      const newTurn = allTurns.find(
        turn => turn.date === payload.date && turn.time === payload.time
      );

      dispatch({ type: POST_TURN, payload: newTurn });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };
}

export function getInfoClinic() {
  // (officeHours, turnStandardDuration)
  return async function (dispatch) {
    try {
      const clinics = (await axios.get('/Clinics')).data;
      return dispatch({ type: GET_INFO_CLINIC, payload: clinics });
    } catch (e) {
      console.log(e);
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.response.data.error,
      });
    }
  };
}

export function deleteTurn(id) {
  return {
    type: DELETE_TURN,
    payload: id,
  };
}

export function updateMedic(infoMedic, infoUser, ClinicID, ID) {
  return async function (dispatch) {
    try {
      const medics = (
        await axios.put(`/medics/${ID}`, { infoUser, infoMedic, ClinicID })
      ).data;
      return dispatch({ type: UPDATE_MEDIC_INFO, payload: medics });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getMedicInfo(email) {
  // console.log(email)
  return async function (dispatch) {
    try {
      const medicInfo = (await axios.get(`/medics/?email=${email}`)).data;
      // console.log(medicInfo)
      return dispatch({ type: GET_MEDIC_INFO, payload: medicInfo });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getClinic() {
  return async function (dispatch) {
    try {
      const clinic = await axios.get('/Clinics');
      if (clinic[0] === true && clinic[1].error.msg === 'No clinics added!') {
        return dispatch({ type: CREATE_CLINIC });
      }
      return dispatch({ type: GET_CLINIC, payload: clinic.data[0] });
    } catch (error) {
      console.log(error);
    }
  };
}
export function updatePassword(changedPassword) {
  return async function () {
    try {
      const result = await axios.put(`/password/update`, changedPassword);
      return result;
    } catch (error) {
      console.error(error);
      return Swal.fire({
        icon: 'error',
        title: error.response.data.error,
        text:
          error.response.data.description +
          '. For your security you were redirected to the login page',
      });
    }
  };
}

export function postCLinic(clinic) {
  return async function (dispatch) {
    try {
      await axios.post('/Clinics', clinic);
      return dispatch({ type: POST_CLINIC, payload: clinic });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateClinic(clinic) {
  return async function (dispatch) {
    try {
      const updatedClinic = (await axios.put('/Clinics', clinic)).data;
      return dispatch({ type: UPDATE_CLINIC, payload: updatedClinic });
    } catch (error) {
      console.log(error);
    }
  };
}
