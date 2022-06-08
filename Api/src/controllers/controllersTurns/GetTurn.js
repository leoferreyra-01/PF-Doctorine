'use strict';

//|> SEQUELIZE
const { Op } = require('sequelize');
const { Medic, Patient, Turn } = require('../../db');

//|> CONTROLLER

async function getTurns() {
  const turndate = await Turn.findAll({
    include: [Patient, Medic],
  });

  let res = await turndate.map(t => t.dataValues);

  return res;
}

async function getTurnsid(UserID) {
  const searchid = await Turn.findByPk(UserID, {
    where: { ID: UserID },
    include: [Patient, Medic],
  });

  return searchid;
}

async function getTurnsidP(UserID) {
  const searchid = await Turn.findAll({
    where: { PatientID: UserID },
    include: [Patient, Medic],
  });

  return searchid;
}
module.exports = {
  getTurns,
  getTurnsid,
  getTurnsidP,
};
