const { Evolution, Patient } = require('../db');

async function getEvolution() {
  const evo = await Evolution.findAll();

  if (!evo.length) throw new Error(`No Evolutions found.`);

  return evo;
}

async function getEvolutionID(id) {
  const evo = await Evolution.findByPk(id);

  if (!evo) throw new Error(`There is no Evolution with "EvolutionID=${id}".`);

  return evo;
}

async function getEvolutionPatient(PatientID) {
  const findPatient = await Patient.findByPk(PatientID, {
    include: [Evolution],
  });

  if (!findPatient)
    throw new Error(`There is no Patient with "PatientID=${PatientID}".`);

  const evoPatient = findPatient.dataValues.Evolution;
  if (!evoPatient.length) throw new Error(`No Evolutions found.`);

  return evoPatient;
}

module.exports = {
  getEvolution,
  getEvolutionID,
  getEvolutionPatient,
};
