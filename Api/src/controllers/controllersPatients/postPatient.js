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

async function postPatient(infoUser, infoPatient) {
  const newPatient = await Patient.create(infoPatient);

  await newPatient.createUser(infoUser);

  return User.findOne({
    where: { document: infoUser.document },
    include: [Patient],
  });
}

module.exports = {
  postPatient,
};
