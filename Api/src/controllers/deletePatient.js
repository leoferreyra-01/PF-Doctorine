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
} = require('../db');

//|> CONTROLLER

async function deletePatient(PatientID) {
  const getPatient = await Patient.findAll({
    where: {
      ID: PatientID,
    },
  });

  await User.destroy({
    where: {
      ID: getPatient[0].dataValues.UserID,
    },
  });

  await Patient.destroy({
    where: {
      ID: PatientID,
    },
  });
}

module.exports = {
  deletePatient,
};
