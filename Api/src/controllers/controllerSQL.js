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

async function getSQL(sql) {
  sql = sql.split('%').join(' ');
  return (await sequelize.query(sql))[0];
}

module.exports = {
  getSQL,
};
