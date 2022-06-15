export default function sendPatientHelper(data) {
  const d = data.birth.getDate();
  const m = data.birth.getMonth() + 1;
  const y = data.birth.getFullYear();
  const dateOfBirth =
    '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  const { medicalService, tutor, birth, ...restOfData } = data;
  const fixedData = {
    infoUser: {
      ...restOfData,
      password: null,
      userType: 'Patient',
      imageProfile: null,
      birth: dateOfBirth,
    },
    infoPatient: {
      medicalService,
      showClinicalHistory: false,
      tutor: tutor ? tutor : null,
    },
  };
  return fixedData;
}
