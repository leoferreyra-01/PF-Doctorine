'use strict';
//|> SEQUELIZE
const { Patient } = require('../../db');

async function validateInfoPatient(
  ruteType = 'POST',
  { medicalService, showClinicalHistory, tutor }
) {
  //|> medicalService: STRING
  if (medicalService) {
    if (typeof medicalService !== 'string')
      throw new Error('"medicalService" must be a string.');
  }

  //|> showClinicalHistory: BOOLEAN
  if (showClinicalHistory) {
    if (typeof showClinicalHistory !== 'boolean')
      throw new Error('"showClinicalHistory" must be a boolean.');
  }

  //|> tutor: INTEGER(UserID)
  if (tutor) {
    if (typeof tutor !== 'number') throw new Error('"tutor" must be a number.');
  }

  return true;
}

module.exports = { validateInfoPatient };
