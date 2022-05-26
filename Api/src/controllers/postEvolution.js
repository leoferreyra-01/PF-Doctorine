const { Evolution } = require('../db');

async function postEvolution({
  date,
  observations,
  TreatmentID,
  ToothID,
  MedicID,
  PatientID,
}) {
  let createEvolution = await Evolution.create({
    date,
    observations,
    TreatmentID,
    ToothID,
  });

  await createEvolution.setMedic(MedicID);
  await createEvolution.setPatient(PatientID);

  return createEvolution;
}

module.exports = { postEvolution };
