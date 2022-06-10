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

  const getPatient = await Patient.findOne({
    where: {
      ID: PatientID,
    },
  });

  await User.update(infoUser, {
    where: {
      ID: getPatient.dataValues.UserID,
    },
  });

  return User.findOne({
    where: { ID: getPatient.dataValues.UserID },
    include: [Patient],
  });
}

module.exports = {
  putPatient,
};
