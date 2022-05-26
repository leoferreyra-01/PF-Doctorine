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
} = require('../../db');

//|> CONTROLLER

async function getPatients(query = {}) {
  const findPatients = await User.findAll({
    where: {
      ...query,
      userType: 'Patient',
    },
    include: [Patient],
  });

  if (!findPatients.length) throw new Error(`No patients found.`);

  return findPatients;
}

async function getPatientById(PatientID = null) {
  const findPatient = await Patient.findByPk(PatientID);

  if (!findPatient)
    throw new Error(`There is no Patient with "PatientID=${PatientID}".`);

  return User.findByPk(findPatient.dataValues.UserID, {
    include: [Patient],
  });
}

module.exports = {
  getPatients,
  getPatientById,
};
