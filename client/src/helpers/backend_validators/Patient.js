'use strict';

import axios from 'axios';

//|?| IMPORTANT: Testing pending...
// based on 'redux/actions/postPatient(patient)'
export default async function validatePatient(patient, PatientID = null) {
  // patient: patient object = { infoUser, infoPatient }
  try {
    let rute = '';
    let ruteType = '';
    if (!PatientID) {
      rute = '/validate/patient';
      ruteType = 'post';
    } else {
      rute = '/validate/patient/' + PatientID;
      ruteType = 'put';
    }
    return (await axios[ruteType](rute, patient)).data;
  } catch (error) {
    console.error(error);
    return error.response.data;

    //  const [patient_fail, patient_errors] = error.response.data;
    //    patient_fail: boolean. If true, the validator failed.
    //    patient_errors: object. If fail is false, the errors object will be empty.
    // see index.js for example
  }
}
