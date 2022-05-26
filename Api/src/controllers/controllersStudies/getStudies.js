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

async function getStudies() {
  const stotal = await Study.findAll({
    include: [Patient],
  });
  return stotal;
}
async function getStudiesId(req, res) {
  const { id } = req.params;
  const stotal = await Study.findByPk(id, {
    where: { ID: id },
    include: [Patient],
  });
  return res.json(stotal);
}
async function getStudiesIdP(req, res) {
  const { id } = req.query;
  const stotal = await Study.findAll({
    where: { PatientID: id },
  });
  return res.json(stotal);
}

module.exports = {
  getStudies,
  getStudiesId,
  getStudiesIdP,
};
