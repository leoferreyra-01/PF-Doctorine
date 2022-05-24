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

async function getMedic(MedicID = null) {
  let find = {
    include: [User, Clinic],
  };

  if (MedicID)
    find = {
      where: {
        ID: MedicID,
      },
      include: [User, Clinic],
    };

  const medic = Medic.findAll(find);

  return medic;
}

module.exports = {
  getMedic,
};
