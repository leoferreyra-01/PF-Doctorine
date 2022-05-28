'use strict';

//|> SEQUELIZE

const { Evolution, Patient } = require('../../db');

//|> CONTROLLER

async function getEvolution() {
  const evo = await Evolution.findAll();

  if (!evo) throw new Error('There are no evolution available for the moment');
  return evo;
}

async function getEvolutionID(id) {
  const evo = await Evolution.findByPk(id);

  if (!evo) throw new Error(`There are no evolution with the ID: ${id}`);

  return evo;
}

async function getEvolutionPatient(PatientID) {
  const evoPatient = await Patient.findByPk(PatientID, {
    include: [Evolution],
  });

  if (!evoPatient)
    throw new Error(
      `There are no evolution associated with the PatientID: ${PatientID}`
    );

  return evoPatient.Evolution;
}

module.exports = {
  getEvolution,
  getEvolutionID,
  getEvolutionPatient,
};
