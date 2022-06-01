import {
  GET_PATIENT,
  POST_PATIENT,
  GET_PATIENT_DNI,
  GET_EVOLUTIONS,
  GET_STUDIES,
  CLEAR,
  GET_TURNS,
  GET_ALL_PATIENTS,
  GET_CLINICAL_HISTORY,
  GET_TREATMENTS,
  GET_MEDICS,
  POST_CLINICAL_HISTORY,
  GET_TOOTH,
  /////LOGIN
  LOGIN_USER,
  AUTH_SWITCH,
  LOGOUT_USER,
  GET_SUCCESS,
  GET_USERS,
  USER_TO_ADMIN,
  DELETE_USER,
  ENTER_HOME,
} from './actions';

const initialState = {
  allPatients: [],
  newPatientId: 0,
  searchedPatient: [],
  patient: {},
  medics: [],
  evolutions: [],
  studies: [],
  unavailableTurns: [],
  homeToShow: 'patient',
  treatments: [],
  tooth: [],
  //////LOGIN
  user: {},
  allUsers: [],
  success: [],
  auth: false,
  ///////////
  clinicalHistory: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };

    case GET_PATIENT_DNI:
      let searchedPatient = state.allPatients.filter(
        patient => patient.document === action.payload * 1
      );
      if (searchedPatient.length === 0) searchedPatient = 'Patient Not Found';
      return {
        ...state,
        searchedPatient: searchedPatient,
      };
    // return { //Forma de guardar con respecto a peticiones del back
    //   ...state,
    //   searchedPatient: Array.isArray(action.payload)
    //     ? [...action.payload]
    //     : [action.payload],
    // };

    case GET_ALL_PATIENTS:
      return {
        ...state,
        allPatients: [...state.allPatients, ...action.payload],
      };

    case POST_PATIENT:
      return {
        ...state,
        allPatients: [...state.allPatients, action.payload],
        newPatientId: action.payload.Patient.ID,
      };

    case CLEAR:
      return {
        ...state,
        patient: {},
        searchedPatient: [],
        unavailableTurns: [],
        clinicalHistory: {},
        evolutions: [],

        studies: [],
      };

    case GET_TURNS:
      return {
        ...state,
        unavailableTurns: [...state.unavailableTurns, ...action.payload],
      };

    case GET_EVOLUTIONS:
      return {
        ...state,
        evolutions: Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload],
      };

    case GET_STUDIES:
      return {
        ...state,
        studies: Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload],
      };

    //////LOGIN
    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        favourites: [],
      };
    }
    case AUTH_SWITCH: {
      return {
        ...state,
        auth: false,
      };
    }

    case LOGIN_USER: {
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('loggedToken')),
      };
    }

    case GET_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      };
    }
    case 'POST_PASSWORD_RESET':
      return {
        ...state,
      };
    case 'POST_NEW_PASSWORD':
      return {
        ...state,
      };
    case USER_TO_ADMIN:
      state.allUsers.forEach(user => {
        if (user.id === action.payload.id) {
          user.isAdmin = action.payload.isAdmin;
        }
      });
      console.log(action.payload.id);
      return {
        ...state,
        allUsers: state.allUsers,
      };
    case GET_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(user => user.id !== action.payload.id),
      };
    ////////
    case ENTER_HOME:
      return {
        ...state,
        homeToShow: action.payload,
      };

    case GET_CLINICAL_HISTORY:
      return {
        ...state,
        clinicalHistory: action.payload,
      };

    case POST_CLINICAL_HISTORY:
      return {
        ...state,
        clinicalHistory: [...state.clinicalHistory, ...action.payload],
      };

    case GET_TREATMENTS:
      return {
        ...state,
        treatments: action.payload,
      };

    case GET_MEDICS:
      return {
        ...state,
        medics: action.payload,
      };
    case GET_TOOTH:
      return {
        ...state,
        tooth: action.payload,
      };
    default:
      return { ...state };
  }
}
