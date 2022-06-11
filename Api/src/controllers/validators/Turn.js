'use strict';

//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

const xValidateInfoTurn = [
  //|> DATE
  check('date')
    .default(undefined)
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Date is required.');
      }
      return true;
    })
    .if(check('date').exists())
    .trim()
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Date must be a date format (YYYY-MM-DD).'),

  //|> TIME
  check('time')
    .default(undefined)
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Time is required.');
      }
      return true;
    })
    .if(check('time').exists())
    .trim()
    .isNumeric()
    .withMessage('Time must be a number.'),

  //|> DURATION
  check('duration')
    .default(undefined)
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Duration is required.');
      }
      return true;
    })
    .if(check('duration').exists())
    .trim()
    .isFloat({ min: 0.166666 })
    .withMessage('Duration must be at least 10 minutes.'),

  //|> DESCRIPTION
  check('description')
    .default(undefined)
    .if(check('description').exists())
    .trim(),

  //|> MEDIC ACCEPTS
  check('medicAccepts')
    .default(undefined)
    .if(check('medicAccepts').exists())
    .isBoolean()
    .withMessage('Medic accepts must be a boolean.'),

  //|> PATIENT ACCEPTS
  check('patientAccepts')
    .default(undefined)
    .if(check('patientAccepts').exists())
    .isBoolean()
    .withMessage('Patient accepts must be a boolean.'),

  //|> MEDIC
  check('MedicID')
    .default(undefined)
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Medic is required.');
      }
      return true;
    })
    .if(check('MedicID').exists())
    .trim()
    .isInt()
    .withMessage('Medic must be a number.'),

  //|> PATIENT
  check('PatientID')
    .default(undefined)
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Patient is required.');
      }
      return true;
    })
    .if(check('PatientID').exists())
    .trim()
    .isInt()
    .withMessage('Patient must be a number.'),
];

module.exports = {
  xValidateInfoTurn,
};
