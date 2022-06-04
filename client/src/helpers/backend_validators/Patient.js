'use strict';

import axios from 'axios';

//|?| IMPORTANT: Testing pending...
// based on 'redux/actions/postPatient(patient)'
export default async function validatePatient(patient) {
  try {
    const data = (await axios.post('/patients', patient)).data;

    return [false, data];
  } catch (error) {
    console.log(error);
    if (error.response.status === 403) return error.response.data;

    //  const [patient_fail, patient_errors] = error.response.data;
    //    patient_fail: boolean. If true, the validator failed.
    //    patient_errors: object. If fail is false, the errors object will be empty.
    // see index.js for example
  }
}
