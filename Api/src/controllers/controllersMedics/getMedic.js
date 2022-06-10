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

async function getMedic(MedicID = null, query = {}) {
  if (MedicID) {
    const findMedics = await Medic.findByPk(MedicID);

    if (!findMedics)
      throw new Error(`There is no Medic with "MedicID=${MedicID}".`);

    return User.findByPk(findMedics.dataValues.UserID, {
      include: [Medic],
    });
  } else {
    const findMedic = await User.findAll({
      where: {
        ...query,
        userType: 'Medic',
      },
      include: [Medic],
    });

    if (!findMedic.length) throw new Error(`No medics found.`);

    return findMedic;
  }
}

module.exports = {
  getMedic,
};
