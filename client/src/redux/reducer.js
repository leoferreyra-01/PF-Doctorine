import {
    GET_PATIENT,
    CLEAR,
    GET_TURNS,
    GET_ALL_PATIENTS,
} from './actions'

const initialState = {
    allPatients: [],
    patient: [],
    unavailableTurns: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PATIENT:
            return {
                ...state,
                patient: action.payload
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
                patient: []
            };

        case GET_TURNS:
            return {
                ...state,
                unavailableTurns: [...state.unavailableTurns, ...action.payload]
            };

        default: 
            return { ...state }
    }
}