'use strict';
//|> SEQUELIZE
const { sequelize } = require('../../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

function xValidateModelID(model, ModelID) {
  return check(ModelID)
    .isNumeric()
    .notEmpty()
    .bail()
    .custom(async id => {
      const modelId = await sequelize.models[model].findByPk(id);

      if (!modelId) throw new Error(`${model} ID ${id} does not exist.`);

      return true;
    });
}

async function validateModelID(model, id, ids = []) {
  //|> PRELOADS
  if (!ids.length)
    ids = (await sequelize.models[model].findAll()).map(
      model => model.dataValues.ID
    );

  //|> ERRORS
  let validation = true;
  const Errors = {};

  //|> ID exist
  if (!ids.includes(parseInt(id))) Errors.ID = `ID ${id} does not exist.`;

  //|> RESULTS
  if (Object.keys(Errors).length) validation = false;

  return [validation, Errors];
}

module.exports = { validateModelID, xValidateModelID };
