import {
  GET_PATIENT,
  CLEAR,
  GET_TURNS,
  GET_ALL_PATIENTS,
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
  patient: [],
  unavailableTurns: [],
  homeToShow: 'login',
  //////LOGIN
  user: {},
  allUsers: [],
  success: [],
  auth: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };

    // case GET_ALL_PATIENTS:
    //     return {
    //         ...state,
    //         allPatients: [...allPatients, ...action.payload]
    //     };

    case CLEAR:
      return {
        ...state,
        allPatients: [],
        patient: [],
      };

    case GET_TURNS:
      return {
        ...state,
        unavailableTurns: [...state.unavailableTurns, ...action.payload],
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
    default:
      return { ...state };
  }
}
