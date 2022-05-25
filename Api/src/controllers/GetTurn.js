'use strict';

//|> SEQUELIZE
const { Op } = require('sequelize');
const { Medic, Patient, Turn } = require('../db');

//|> CONTROLLER

async function getTurns() {
  const turndate = await Turn.findAll({
    include: [Patient, Medic],
  });

  let res = await turndate.map(t => t.dataValues);

  return res;
}

async function getTurnsid(UserId) {
  const searchid = await Turn.findByPk(UserId, {
    where: { ID: UserId },
    include: [Patient, Medic],
  });

  return searchid;
}

async function getTurnsidP(UserId) {
  const searchid = await Turn.findAll({
    where: { PatientID: UserId },
    include: [Medic],
  });

  return searchid;
}
module.exports = {
  getTurns,
  getTurnsid,
  getTurnsidP,
};
