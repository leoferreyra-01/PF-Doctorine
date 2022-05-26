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

async function putPatient(PatientID, infoUser, infoPatient) {
  await Patient.update(infoPatient, {
    where: {
      ID: PatientID,
    },
  });

  const getPatient = await Patient.findAll({
    where: {
      ID: PatientID,
    },
  });

  await User.update(infoUser, {
    where: {
      ID: getPatient[0].dataValues.UserID,
    },
  });
}

module.exports = {
  putPatient,
};
