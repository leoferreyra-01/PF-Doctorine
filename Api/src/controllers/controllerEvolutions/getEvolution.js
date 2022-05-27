const { Evolution } = require('../../db');

async function getEvolution() {
  const evo = await Evolution.findAll();
  return evo;
}

async function getEvolutionID(id) {
  const evo = await Evolution.findByPk(id);
  return evo;
}

async function getEvolutionPatient(patientID) {
  const evoPatient = await Evolution.findAll({
    where: { PatientID: patientID },
  });
  return evoPatient;
}

module.exports = {
  getEvolution,
  getEvolutionID,
  getEvolutionPatient,
};
