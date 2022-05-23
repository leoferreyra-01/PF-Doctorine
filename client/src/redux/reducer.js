import {
    GET_PATIENT,
    CLEAR,
} from './actions'

const initialState = {
    allPatients: [],
    patient: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PATIENT:
            return {
                ...state,
                patient: action.payload
            };

        case CLEAR:
            return {
                ...state,
                allPatients: [],
                patient: []
            };
    }
}