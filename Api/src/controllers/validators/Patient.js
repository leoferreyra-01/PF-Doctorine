'use strict';
//|> SEQUELIZE
const { User } = require('../../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

const xValidateInfoPatient = [
  //|> medicalService
  check('infoPatient.medicalService', 'Must be a string.')
    .default(undefined)
    .if(check('infoPatient.medicalService').exists())
    .isString()
    .withMessage('Must be a string.')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 characters long.')
    .trim(),

  //|> showClinicalHistory
  check('infoPatient.showClinicalHistory', 'Must be a boolean.')
    .default(undefined)
    .if(check('infoPatient.showClinicalHistory').exists())
    .isBoolean(),

  //|> tutor
  check('infoPatient.tutor')
    .default(undefined)
    .if(check('infoPatient.tutor').exists())
    .isNumeric()
    .withMessage('Tutor document must be numeric.')
    .isInt({ min: 1 })
    .withMessage('Tutor document must be a positive integer.')
    .isLength({ min: 8 })
    .withMessage('Tutor document must have 8 or more digits.')
    .trim()
    .bail()
    .custom(async value => {
      // PRELOADS
      const user = await User.findOne({
        where: { document: value },
      });

      // ID exist
      if (!user) throw new Error(`User document ${value} dont exists.`);

      // age validation to be a tutor
      const userAge = user.dataValues.age;
      if (userAge < 18)
        throw new Error(`User tutor must have at least 18 years old.`);

      return true;
    }),
];

async function validateInfoPatient(
  ruteType = 'POST',
  { medicalService, showClinicalHistory, tutor }
) {
  //|> ERRORS
  let validation = true;
  const Errors = {};

  //|> medicalService: STRING
  if (medicalService) {
    if (typeof medicalService !== 'string')
      Errors.medicalService = 'Must be a string.';
  }

  //|> showClinicalHistory: BOOLEAN
  if (showClinicalHistory) {
    if (typeof showClinicalHistory !== 'boolean')
      Errors.showClinicalHistory = 'Must be a boolean.';
  }

  //|> tutor: INTEGER(UserID)
  if (tutor) {
    if (typeof tutor !== 'number') Errors.tutor = 'Must be a number.';
  }

  //|> RESULTS
  if (Object.keys(Errors).length) validation = false;

  return [validation, Errors];
}

module.exports = { validateInfoPatient, xValidateInfoPatient };
