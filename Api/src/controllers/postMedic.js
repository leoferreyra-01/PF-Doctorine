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

async function postMedic(infoUser, infoMedic, ClinicID) {
  const newMedic = await Medic.create(infoMedic);

  newMedic.createUser(infoUser);
  newMedic.setClinic(ClinicID);

  return 'Medic created.';
}

module.exports = {
  postMedic,
};
