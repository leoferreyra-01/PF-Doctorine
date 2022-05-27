'use strict';

//|> SEQUELIZE

const { Medic, Patient, Evolution, Teeth, Treatment } = require('../../db');

//|> CONTROLLER

async function postEvolution({
  date,
  observations,
  PatientID,
  MedicID,
  TreatmentID,
  toothID,
}) {
  let addMedics = await Medic.findByPk(MedicID);
  let addPatients = await Patient.findByPk(PatientID);
  let tooth = await Teeth.findByPk(toothID);
  let treatment = await Treatment.findByPk(TreatmentID);

  if (!addMedics) throw new Error(`There is no Medic with ID: ${MedicID}`);
  if (!addPatients)
    throw new Error(`There is no Patient with ID: ${PatientID}`);
  if (!tooth)
    throw new Error(`There is no Teeth registered with ID: ${toothID}`);
  if (!treatment)
    throw new Error(
      `There is no Treatment registered with ID: ${TreatmentID}`
    );

  let createEvolution = await Evolution.create({
    date,
    observations,
    TreatmentID,
    toothID,
  });
  await createEvolution.setMedic(addMedics);
  await createEvolution.setPatient(addPatients);

  return { success: 'Evolution created correctly', Evolution: createEvolution };
}

module.exports = { postEvolution };
