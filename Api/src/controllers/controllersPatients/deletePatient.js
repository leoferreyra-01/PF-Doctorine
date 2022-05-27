'use strict';

//|> SEQUELIZE
const { Op } = require('sequelize');
const {
  User,
  Medic,
  Patient,
  Turn,
  Budget,
  Clinic,
  ClinicalHistory,
  Treatment,
  Teeth,
  Study,
  Evolution,
  sequelize,
} = require('../../db');

//|> CONTROLLER

async function deletePatient(PatientID) {
  const findPatient = await Patient.findByPk(PatientID);

  if (!findPatient)
    throw new Error(`There is no Patient with "PatientID=${PatientID}".`);

  await User.destroy({
    where: {
      ID: findPatient.dataValues.UserID,
    },
  });

  await Patient.destroy({
    where: {
      ID: PatientID,
    },
  });

  return 'Patient deleted.';
}

module.exports = {
  deletePatient,
};
