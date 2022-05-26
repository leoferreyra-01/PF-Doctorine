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

async function deleteMedic(MedicID) {
  const getMedic = await Medic.findAll({
    where: {
      ID: MedicID,
    },
  });

  await User.destroy({
    where: {
      ID: getMedic[0].dataValues.UserID,
    },
  });

  await Medic.destroy({
    where: {
      ID: MedicID,
    },
  });
}

module.exports = {
  deleteMedic,
};
