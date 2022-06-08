'use strict';

import axios from 'axios';

// based on 'redux/actions/postPatient(patient)'
export default async function validatePatient(patient, PatientID = null) {
  // patient: patient object = { infoUser, infoPatient }
  try {
    let rute = '';
    let ruteType = '';
    if (PatientID) {
      rute = '/validate/patient/' + PatientID;
      ruteType = 'put';
    } else {
      rute = '/validate/patient';
      ruteType = 'post';
    }
    return (await axios[ruteType](rute, patient)).data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}
