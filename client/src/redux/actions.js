import axios from 'axios'
export const GET_PATIENT = 'GET_PATIENT';
export const CLEAR = 'CLEAR';

export function getPatient(id) {
    return function (dispatch) {
        // return axios.get(`http://localhost:3001/recipes/?id=${id}`)
        //     .then(res => dispatch({ type: GET_PATIENT, payload: res.data }))
        //     .catch(error => {
        //         if (error.response.status === 404) return alert(error.response.data.msg)
        //         alert(error.message)
        //     })
        console.log('ACTION')
    };
};

export function clear() {
    return {
        type: CLEAR
    };
};