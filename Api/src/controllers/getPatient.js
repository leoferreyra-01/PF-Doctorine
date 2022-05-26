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

async function getPatient(PatientID = null) {
  if (PatientID)
    return Patient.findByPk(PatientID, {
      include: [User],
    });
  else
    return Patient.findAll({
      include: [User],
    });
}

module.exports = {
  getPatient,
};
