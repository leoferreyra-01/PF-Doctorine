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
} = require('../db');

//|> CONTROLLER

async function getPatients(query = null) {
  if (query)
    return User.findAll({
      where: {
        ...query,
        userType: 'Patient',
      },
      include: [Patient],
    });
  else
    return User.findAll({
      where: {
        userType: 'Patient',
      },
      include: [Patient],
    });
}

async function getPatientById(PatientID = null) {
  const findPatient = await Patient.findByPk(PatientID);

  return User.findByPk(findPatient.dataValues.UserID, {
    include: [Patient],
  });
}

module.exports = {
  getPatients,
  getPatientById,
};
