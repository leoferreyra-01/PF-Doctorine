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
} = require('../../db');

//|> CONTROLLER

async function getMedic(MedicID = null) {
  if (MedicID) {
    const findMedic = await Medic.findByPk(MedicID);

    return User.findByPk(findMedic.dataValues.UserID, {
      include: [Medic],
    });
  } else
    return User.findAll({
      where: {
        userType: 'Medic',
      },
      include: [Medic],
    });
}

module.exports = {
  getMedic,
};
