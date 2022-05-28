export default function sendPatientHelper(data) {
  const d = data.birth.getDate();
  const m = data.birth.getMonth() + 1;
  const y = data.birth.getFullYear();
  const dateOfBirth =
    '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  const fixedData = {
    infoUser: {
      password: data.document + data.name,
      userType: 'Patient',
      imageProfile: null,
      birth: dateOfBirth,
    },
    infoPatient: {
      medicalService: data.medicalService,
      showClinicalHistory: false,
      tutor: data.tutor ? data.tutor : null,
    },
  };
  for (let prop in data) {
    if (prop !== 'medicalService' && prop !== 'tutor' && prop !== 'birth') {
      fixedData.infoUser[prop] = data[prop];
    }
  }
  return fixedData;
}
