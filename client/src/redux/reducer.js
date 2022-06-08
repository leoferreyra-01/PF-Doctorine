import {
  GET_PATIENT,
  POST_PATIENT,
  GET_PATIENT_DNI,
  GET_PATIENT_DNI2,
  GET_PATIENT_NAME,
  GET_EVOLUTIONS,
  GET_STUDIES,
  CLEAR,
  GET_TURNS,
  GET_ALL_PATIENTS,
  GET_BUDGETS,
  GET_BUDGETS_DNI,
  GET_BUDGETS_NAME,
  POST_BUDGET,
  ORDER_BUDGETS_BY_DATE_ASC,
  ORDER_BUDGETS_BY_DATE_DES,
  ORDER_BUDGETS_BY_PRICE_ASC,
  ORDER_BUDGETS_BY_PRICE_DES,
  ORDER_BUDGETS_BY_NAME_ASC,
  ORDER_BUDGETS_BY_NAME_DES,
  FILTER_BUDGETS_BY_COMPLETED,
  FILTER_BUDGETS_BY_PENDING,
  GET_CLINICAL_HISTORY,
  GET_TREATMENTS,
  GET_MEDICS,
  POST_CLINICAL_HISTORY,
  GET_TOOTH,
  POST_EVOLUTION,
  POST_MEDIC_LOGIN,
  POST_PATIENT_LOGIN,
  /////LOGIN
  LOGIN_USER,
  AUTH_SWITCH,
  LOGOUT_USER,
  GET_SUCCESS,
  GET_USERS,
  USER_TO_ADMIN,
  DELETE_USER,
  ENTER_HOME,
  UPDATE_PATIENT,
} from './actions';

import getAllPatientsName from '../helpers/getAllPatientsName';

import orderBudgetsByRecentDate, {
  orderBudgetsByOlderDate,
} from '../helpers/orderByDate';
import {
  orderBudgetsByHigherPrice,
  orderBudgetsByLowerPrice,
} from '../helpers/orderByPrice';
import {
  filterCompletedBudgets,
  filterPendingBudgets,
} from '../helpers/filterByStatus';

import { orderByNameAsc, orderByNameDes } from '../helpers/orderByName';

const initialState = {
  allPatients: [],
  newPatientId: 0,
  urlstudy: '',
  urlPayment: '',
  searchedPatient: [],
  patient: {},
  medics: [],
  evolutions: [],
  studies: [],
  allBudgets: [],
  budgetsToShow: [],
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
      let searchedPatientDNI = state.allPatients.filter(
        patient => patient.document === action.payload * 1
      );
      if (searchedPatientDNI.length === 0)
        searchedPatientDNI = 'Patient Not Found';
      return {
        ...state,
        searchedPatient: searchedPatientDNI,
      };
    // return { //Forma de guardar con respecto a peticiones del back
    //   ...state,
    //   searchedPatient: Array.isArray(action.payload)
    //     ? [...action.payload]
    //     : [action.payload],
    // };

    case GET_PATIENT_NAME:
      let searchedPatientName = state.allPatients.filter(patient =>
        patient.fullName.toLowerCase().includes(action.payload.toLowerCase())
      );
      if (searchedPatientName.length === 0)
        searchedPatientName = 'Patient Not Found';
      return {
        ...state,
        searchedPatient: searchedPatientName,
      };

    case GET_PATIENT_DNI2:
      return {
        ...state,
        searchedPatient: action.payload[0],
      };

    case GET_ALL_PATIENTS:
      return {
        ...state,
        allPatients: [...state.allPatients, ...action.payload],
      };

    case GET_BUDGETS_DNI:
      let searchedBudgetsDNI = state.allBudgets.filter(
        budget => budget.patientDocument === action.payload * 1
      );
      if (searchedBudgetsDNI.length === 0)
        searchedBudgetsDNI = 'Budget Not Found';
      return {
        ...state,
        budgetsToShow: searchedBudgetsDNI,
      };
    case GET_BUDGETS_NAME:
      let searchedBudgetsName = state.allBudgets.filter(budget =>
        budget.patientFullName
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      if (searchedBudgetsName.length === 0)
        searchedBudgetsName = 'Budget Not Found';
      return {
        ...state,
        budgetsToShow: searchedBudgetsName,
      };

    case GET_BUDGETS:
      const orderedBudgets = orderBudgetsByRecentDate(action.payload);
      const namedBudgets = getAllPatientsName(
        orderedBudgets,
        state.allPatients
      );
      return {
        ...state,
        allBudgets: namedBudgets,
        budgetsToShow: namedBudgets,
      };

    case ORDER_BUDGETS_BY_NAME_ASC:
      return {
        ...state,
        budgetsToShow: orderByNameAsc(state.allBudgets),
      };

    case ORDER_BUDGETS_BY_NAME_DES:
      return {
        ...state,
        budgetsToShow: orderByNameDes(state.allBudgets),
      };

    case ORDER_BUDGETS_BY_DATE_ASC:
      return {
        ...state,
        budgetsToShow: orderBudgetsByRecentDate(state.allBudgets),
      };

    case ORDER_BUDGETS_BY_DATE_DES:
      return {
        ...state,
        budgetsToShow: orderBudgetsByOlderDate(state.allBudgets),
      };

    case ORDER_BUDGETS_BY_PRICE_ASC:
      return {
        ...state,
        budgetsToShow: orderBudgetsByLowerPrice(state.allBudgets),
      };

    case ORDER_BUDGETS_BY_PRICE_DES:
      return {
        ...state,
        budgetsToShow: orderBudgetsByHigherPrice(state.allBudgets),
      };

    case FILTER_BUDGETS_BY_COMPLETED:
      return {
        ...state,
        budgetsToShow: filterCompletedBudgets(state.allBudgets),
      };

    case FILTER_BUDGETS_BY_PENDING:
      return {
        ...state,
        budgetsToShow: filterPendingBudgets(state.allBudgets),
      };

    case POST_BUDGET:
      const { linkPayment, ...resBudgets } = action.payload;
      return {
        ...state,
        allBudgets: [resBudgets, ...state.allBudgets],
        budgetsToShow: [resBudgets, ...state.allBudgets],
        urlPayment: linkPayment,
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
        budgetsToShow: [...state.allBudgets],
        studies: '',
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
    case 'POST_STUDY':
      return {
        ...state,
        studies: [action.payload, ...state.studies],
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
    case 'POST_URL':
      return {
        ...state,
        urlstudy: action.payload,
      };
    case UPDATE_PATIENT:
      let allPatientsUpdated = state.allPatients.map(patient => {
        if (patient.ID === action.payload.ID) {
          return action.payload;
        } else {
          return patient;
        }
      });
      return {
        ...state,
        allPatients: allPatientsUpdated,
      };
    case POST_EVOLUTION:
      return {
        ...state,
        evolutions: [...state.evolutions, ...action.payload],
      };
    case POST_MEDIC_LOGIN:
      return {
        ...state,
        medics: [...state.medics, ...action.payload],
      };
    case POST_PATIENT_LOGIN:
      return {
        ...state,
        allPatients: [...state.allPatients, ...action.payload],
      };
    default:
      return { ...state };
  }
}
