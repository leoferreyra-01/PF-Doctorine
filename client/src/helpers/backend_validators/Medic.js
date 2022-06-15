import axios from 'axios';

// based on 'redux/actions/postMedic(medic)'
export default async function validateMedic(medic, MedicID = null) {
  // medic: medic object = { infoUser, infoMedic, ClinicID }
  try {
    let rute = '';
    let ruteType = '';
    if (MedicID) {
      rute = '/medics/' + MedicID + '/?validate=true';
      ruteType = 'put';
    } else {
      rute = '/medics/?validate=true';
      ruteType = 'post';
    }
    return (await axios[ruteType](rute, medic)).data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}
