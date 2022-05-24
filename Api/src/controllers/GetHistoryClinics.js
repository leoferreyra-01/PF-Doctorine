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

async function getHistoryClinic() {
  const hcAll = await ClinicalHistory.findAll({
    include: [Patient],
  });
  // let res = await hcAll.map(hc => hc);
  return hcAll;
}
async function getHistoryClinicId(id) {
  const hcid = await ClinicalHistory.findByPk(id, {
    where: { ID: id },
    include: [Patient],
  });
  return hcid;
}
async function getHistoryClinicPId(id) {
  const hcid = await ClinicalHistory.findOne({
    where: { PatientID: id },
  });
  return hcid;
}

module.exports = {
  getHistoryClinic,
  getHistoryClinicId,
  getHistoryClinicPId,
};
