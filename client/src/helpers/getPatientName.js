export default function getPatientName(patientID, allPatients) {
  let patientName = '';
  if (patientID) {
    patientName = allPatients.filter(
      patient => patient.Patient.ID === patientID
    )[0].fullName;
  }
  return patientName;
}
