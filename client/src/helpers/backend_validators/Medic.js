'use strict';

import axios from 'axios';

//|?| IMPORTANT: Testing pending...
// based on 'redux/actions/postMedic(medic)'
export default async function validateMedic(medic, MedicID = null) {
  // medic: medic object = { infoUser, infoMedic, ClinicID }
  try {
    let rute = '';
    let ruteType = '';
    if (!MedicID) {
      rute = '/validate/medic';
      ruteType = 'post';
    } else {
      rute = '/validate/medic/' + MedicID;
      ruteType = 'put';
    }
    return (await axios[ruteType](rute, medic)).data;
  } catch (error) {
    console.error(error);
    return error.response.data;

    //  const [medic_fail, medic_errors] = error.response.data;
    //    medic_fail: boolean. If true, the validator failed.
    //    medic_errors: object. If fail is false, the errors object will be empty.
    // see index.js for example
  }
}
