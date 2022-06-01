'use strict';
//|> SEQUELIZE
const { sequelize } = require('../../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

const XvalidateModelID = [
  check('ID')
    .isNumeric()
    .not()
    .isEmpty()
    .bail() // stop validation if one before fails. Prevent '.custom()' to execute.
    .custom(async (id, { req }) => {
      let model = '';
      if (req.body.infoPatient) model = 'Patient';
      if (req.body.infoMedic) model = 'Medic';

      //|> PRELOADS
      const ids = (await sequelize.models[model].findAll()).map(
        model => model.dataValues.ID
      );

      //|> ID exist
      if (!ids.includes(parseInt(id)))
        throw new Error(`ID ${id} does not exist.`);

      return true;
    }),
];

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

module.exports = { validateModelID, XvalidateModelID };
