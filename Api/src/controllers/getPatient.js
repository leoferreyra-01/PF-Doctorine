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
  let find = {
    include: [User, ClinicalHistory],
  };

  if (PatientID)
    find = {
      where: {
        ID: PatientID,
      },
      include: [User, ClinicalHistory],
    };

  const patient = Patient.findAll(find);

  return patient;
}

module.exports = {
  getPatient,
};
