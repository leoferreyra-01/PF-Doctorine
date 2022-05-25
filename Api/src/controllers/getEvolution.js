const { Evolution, Patient } = require('../db');

async function getEvolution() {
  const evo = await Evolution.findAll({ include: [Patient] });
  return evo;
}

async function getEvolutionID(id) {
  const evo = await Evolution.findAll(
    { where: { ID: id } },
    { include: Patient }
  );
  return evo;
}

module.exports = {
  getEvolution,
  getEvolutionID,
};
