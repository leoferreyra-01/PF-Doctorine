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
  let query = {};
  if (MedicID)
    where = {
      ID: MedicID,
    };

  const medic = Medic.findAll({
    where: query,
    include: [User, Clinic],
  });

  return medic;
}

module.exports = {
  getMedic,
};
