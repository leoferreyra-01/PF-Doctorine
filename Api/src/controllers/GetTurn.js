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
  const resp = {
    ID: searchid.ID,
    date: searchid.date,
    time: searchid.time,
    duration: searchid.duration,
    description: searchid.description,
    Patient: searchid.Patient,
    Medic: searchid.Medic,
  };
  return resp;
}
module.exports = {
  getTurns,
  getTurnsid,
};
