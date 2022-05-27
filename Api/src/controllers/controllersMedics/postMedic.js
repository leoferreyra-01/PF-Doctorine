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

async function postMedic(infoUser, infoMedic, ClinicID) {
  const newMedic = await Medic.create(infoMedic);

  await newMedic.createUser(infoUser);
  await newMedic.setClinic(ClinicID);

  return User.findOne({
    where: { document: infoUser.document },
    include: [Medic],
  });
}

module.exports = {
  postMedic,
};
