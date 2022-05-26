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

async function putMedic(MedicID, infoUser, infoMedic, ClinicID) {
  await Medic.update(
    {
      ...infoMedic,
      ClinicID,
    },
    {
      where: {
        ID: MedicID,
      },
    }
  );

  const getMedic = await Medic.findAll({
    where: {
      ID: MedicID,
    },
  });

  await User.update(infoUser, {
    where: {
      ID: getMedic[0].dataValues.UserID,
    },
  });
}

module.exports = {
  putMedic,
};
