import {
  GET_PATIENT_INFO,
  POST_PATIENT,
  GET_PATIENT_DNI,
  GET_PATIENT_DNI2,
  GET_PATIENT_NAME,
  GET_EVOLUTIONS,
  GET_STUDIES,
  CLEAR,
  POST_CLINIC,
  UPDATE_CLINIC,
  GET_CLINIC,
  CREATE_CLINIC,
  GET_ALL_PATIENTS,
  GET_BUDGETS,
  GET_PATIENT_BUDGETS,
  GET_BUDGETS_DNI,
  GET_BUDGETS_NAME,
  POST_BUDGET,
  UPDATE_BUDGET,
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
  UPDATE_TREATMENT,
  POST_CLINICAL_HISTORY,
  GET_TOOTH,
  POST_MEDIC_LOGIN,
  POST_PATIENT_LOGIN,
  UPDATE_MEDIC_INFO,
  GET_MEDIC_INFO,
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
  //--TURNERO------//
  GET_TURNS,
  POST_TURN,
  DELETE_TURN,
  GET_INFO_CLINIC,
  GET_MEDICS,
  //---------------//
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

const loggedTokenJSON = window.localStorage.getItem('loggedToken');

const initialState = {
  allPatients: [],
  newPatientId: 0,
  urlstudy: '',
  urlPayment: '',
  searchedPatient: {},
  searchedMedic: {},
  patient: {},
  medics: [],
  clinic: {},
  createClinic: false,
  evolutions: [],
  studies: [],
  allBudgets: [],
  budgetsToShow: [],
  homeToShow: loggedTokenJSON
    ? JSON.parse(loggedTokenJSON).userType
    : 'Patient',
  treatments: [],
  tooth: [],
  //////LOGIN
  user: {},
  allUsers: [],
  success: [],
  auth: false,
  ///////////
  clinicalHistory: [],
  //////////TURNERO
  unavailableTurns: [],
  infoClinics: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_INFO:
      return {
        ...state,
        patient: action.payload,
      };

    case GET_PATIENT_DNI:
      let searchedPatientDNI = state.allPatients.filter(patient =>
        (patient.document + '').includes(action.payload)
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
        searchedPatient: action.payload.patient[0],
      };

    case GET_PATIENT_BUDGETS:
      return {
        ...state,
        allBudgets: action.payload,
      };

    case GET_ALL_PATIENTS:
      return {
        ...state,
        allPatients: action.payload,
      };

    case GET_BUDGETS_DNI:
      let searchedBudgetsDNI = state.allBudgets.filter(budget =>
        (budget.patientDocument + '').includes(action.payload)
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
      return {
        ...state,
        allBudgets: [action.payload, ...state.allBudgets],
        budgetsToShow: [action.payload, ...state.allBudgets],
        urlPayment: action.payload.linkPayment,
      };

    case UPDATE_BUDGET:
      const updatedBudgets = state.allBudgets.map(b => {
        if (b.ID === action.payload.ID) {
          return { ...action.payload, paid: true };
        }
        return b;
      });
      return {
        ...state,
        allBudgets: updatedBudgets,
        budgetsToShow: updatedBudgets,
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
        unavailableTurns: action.payload,
      };

    case GET_EVOLUTIONS:
      return {
        ...state,
        evolutions: action.payload,
      };
    case GET_STUDIES:
      return {
        ...state,
        studies: action.payload,
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

    case UPDATE_TREATMENT:
      const updatedTreatments = state.treatments.map(t => {
        if (t.ID === action.payload.ID) {
          return { ...t, price: action.payload.price };
        }
        return t;
      });
      return {
        ...state,
        treatments: updatedTreatments,
      };

    case 'POST_STUDY':
      return {
        ...state,
        // studies: [action.payload, ...state.studies],
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

    case GET_CLINIC:
      return {
        ...state,
        clinic: action.payload,
      };

    case CREATE_CLINIC:
      return {
        ...state,
        createClinic: true,
      };

    case POST_CLINIC:
      return {
        ...state,
        clinic: action.payload,
        createClinic: false,
      };

    case UPDATE_CLINIC:
      return {
        ...state,
        clinic: action.payload,
      };

    //-------------------//
    case POST_TURN:
      return {
        ...state,
        unavailableTurns: [...state.unavailableTurns, action.payload],
      };

    case DELETE_TURN:
      return {
        ...state,
        unavailableTurns: state.unavailableTurns.filter(
          turn => turn.id !== action.payload
        ),
      };

    case GET_INFO_CLINIC:
      return {
        ...state,
        infoClinics: [...state.infoClinics, ...action.payload],
      };
    //-----------------------//
    case GET_MEDIC_INFO:
      // console.log(action.payload);
      return {
        ...state,
        searchedMedic: action.payload[0],
      };
    case UPDATE_MEDIC_INFO:
      return {
        ...state,
        medics: state.medics.map(medic => {
          if (medic.ID === action.payload.ID) {
            return action.payload;
          } else {
            return medic;
          }
        }),
      };
    default:
      return { ...state };
  }
}
