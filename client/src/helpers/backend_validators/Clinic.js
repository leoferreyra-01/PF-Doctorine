import axios from 'axios';

export default async function validateClinic(clinic, ClinicID = null) {
  // clinic = { la info de la clinica }
  try {
    let rute = '';
    let ruteType = '';
    if (ClinicID) {
      rute = '/Clinics/' + ClinicID + '/?validate=true';
      ruteType = 'put';
    } else {
      rute = '/Clinics/?validate=true';
      ruteType = 'post';
    }
    return (await axios[ruteType](rute, clinic)).data;
    // [flase, null]
  } catch (error) {
    console.error(error);
    return error.response.data;
    // [true, {errors}]
  }
}
