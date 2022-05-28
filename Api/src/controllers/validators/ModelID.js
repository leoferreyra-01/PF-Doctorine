'use strict';
//|> SEQUELIZE
const { sequelize } = require('../../db');

async function validateModelID(model, id) {
  const findByID = await sequelize.models[model].findByPk(id);

  if (!findByID) return new Error(`"${model}ID: ${id}" does not exist.`);

  return true;
}

module.exports = { validateModelID };
