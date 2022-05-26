const { Medic, Patient, Evolution } = require('../db');

async function postEvolution({
  date,
  observations,
  TreatmentID,
  toothID,
  medic,
  patient,
}) {
  let createEvolution = await Evolution.create({
    date,
    observations,
    TreatmentID,
    toothID,
  });
  let addMedics = await Medic.findOne({
    where: { ID: medic },
  });
  let addPatients = await Patient.findOne({ where: { ID: patient } });
  await createEvolution.setMedic(addMedics);
  await createEvolution.setPatient(addPatients);
  return createEvolution;
}

module.exports = { postEvolution };
