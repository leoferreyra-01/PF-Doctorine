'use strict';

const { check } = require('express-validator');

const XvalidateInfoPatient = [
  check('infoPatient.medicalService', 'Must be a string.')
    .if(check('infoPatient.medicalService').exists())
    .exists({
      checkFalsy: true, // if falsy values (eg "", 0, false, null)...
    })
    .isString()
    .not()
    .isEmpty(),
  check('infoPatient.showClinicalHistory', 'Must be a boolean.')
    .if(check('infoPatient.showClinicalHistory').exists())
    .exists({
      checkNull: true, // if null values, will not exist
    })
    .isBoolean()
    .not()
    .isEmpty(),
  check('infoPatient.tutor', 'Must be a number.')
    .if(check('infoPatient.tutor').exists()) // -FIX- mandar NULL
    .exists({
      checkNull: false, //|?| if null values, will not exist
    })
    .isNumeric()
    .not()
    .isEmpty(),
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
