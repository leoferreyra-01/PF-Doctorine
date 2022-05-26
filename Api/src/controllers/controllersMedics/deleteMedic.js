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
  const findMedic = await Medic.findByPk(MedicID);

  if (!findMedic)
    throw new Error(`There is no Medic with "MedicID=${MedicID}".`);

  await User.destroy({
    where: {
      ID: findMedic.dataValues.UserID,
    },
  });

  await Medic.destroy({
    where: {
      ID: MedicID,
    },
  });

  return 'Medic deleted.';
}

module.exports = {
  deleteMedic,
};
