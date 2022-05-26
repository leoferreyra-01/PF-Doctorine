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
  if (MedicID)
    return Medic.findByPk(MedicID, {
      include: [User, Clinic],
    });
  else
    return Medic.findAll({
      include: [User, Clinic],
    });
}

module.exports = {
  getMedic,
};
