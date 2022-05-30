'use strict';

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

module.exports = { validateInfoPatient };
