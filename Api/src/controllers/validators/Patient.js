'use strict';
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

const XvalidateInfoPatient = [
  //|> medicalService
  check('infoPatient.medicalService', 'Must be a string.')
    .if(check('infoPatient.medicalService').exists())
    .exists({
      checkFalsy: true, // if falsy values (eg "", 0, false, null)...
    })
    .isString()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 characters long.')
    .trim(),

  //|> showClinicalHistory
  check('infoPatient.showClinicalHistory', 'Must be a boolean.')
    .if(check('infoPatient.showClinicalHistory').exists())
    .exists({
      checkNull: true, // if null values, will not exist
    })
    .isBoolean()
    .notEmpty(),

  //|> tutor
  check(
    'infoPatient.tutor',
    'Must be a number > 0, string(number) > 0, or null.'
  )
    .if(check('infoPatient.tutor').exists())
    .custom(value => /^[1-9][0-9]*$/.test(value) || value === null),
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

module.exports = { validateInfoPatient, XvalidateInfoPatient };
