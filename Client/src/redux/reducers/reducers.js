import {
  LOGIN_USER,
  AUTH_SWITCH,
  LOGOUT_USER,
  GET_SUCCESS,
  GET_USERS, 
  USER_TO_ADMIN,
  DELETE_USER
} from "../actions/actions";

// ubication: {
//   pais: "",
//   provincia: "",
// },
const collator = new Intl.Collator("es");

const initialState = {
  user: {}, 
  allUsers: [], 
  success: [],
  auth: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

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
        user: JSON.parse(localStorage.getItem("loggedToken")),
      };
    }
   
    case GET_USERS: { 
      return { 
        ...state, 
        allUsers: action.payload
      }
    } 
    case "POST_PASSWORD_RESET":
      return {
        ...state,
      };
    case "POST_NEW_PASSWORD":
      return {
        ...state,
      };
    case USER_TO_ADMIN:
      state.allUsers.forEach((user)=> {
        if(user.id === action.payload.id){
          user.isAdmin = action.payload.isAdmin
        }})
        console.log(action.payload.id)
      return { 
        ...state,
        allUsers: state.allUsers
      }
      case GET_SUCCESS: {
        return {
          ...state,
          success: action.payload,
        };
      }
    case DELETE_USER: 
      return {
        ...state,
        allUsers: state.allUsers.filter(user => user.id !== action.payload.id)
      }
    default:
      return state;
  }
}

export default rootReducer;
