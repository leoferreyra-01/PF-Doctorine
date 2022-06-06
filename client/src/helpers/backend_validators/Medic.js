'use strict';

import axios from 'axios';

//|?| IMPORTANT: Testing pending...
// based on 'redux/actions/postMedic(medic)'
export default async function validateMedic(medic, MedicID = null) {
  // medic: medic object = { infoUser, infoMedic, ClinicID }
  try {
    let rute = '';
    let ruteType = '';
    if (MedicID) {
      rute = '/validate/medic/' + MedicID;
      ruteType = 'put';
    } else {
      rute = '/validate/medic';
      ruteType = 'post';
    }
    return (await axios[ruteType](rute, medic)).data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}
