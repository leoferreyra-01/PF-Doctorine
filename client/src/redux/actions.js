import axios from 'axios'
export const GET_PATIENT = 'GET_PATIENT';
export const CLEAR = 'CLEAR';
export const POST_TURN = 'POST_TURN';
export const GET_TURNS = 'GET_TURNS';
export const GET_ALL_PATIENTS = 'GET_ALL_PATIENTS';

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

export function getAllPatients(){
    return function (dispatch) {
        // return axios.get(`http://localhost:3001/allPatients`)
        //     .then(res => dispatch({ type: GET_ALL_PATIENTS, payload: res.data }))
        //     .catch(error => {
        //         if (error.response.status === 404) return alert(error.response.data.msg)
        //         alert(error.message)
        //     })
    };
};

export function clear() {
    return {
        type: CLEAR
    };
};

export function postTurn(payload){
    return async function(){
        return axios.post(`http://localhost:3001/turn`, payload)
            .catch(error => {
                if (error.response.status === 404) return alert(error.response.data.msg)
                alert(error.message)
            });
    };
};

export function getTurns(){};