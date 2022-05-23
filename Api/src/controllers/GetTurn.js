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

module.exports = {
  getTurns,
};
