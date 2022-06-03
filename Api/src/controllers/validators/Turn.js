'use strict';

//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

const XvalidateInfoTurn = [
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
    .withMessage('Birth must be a date format (YYYY-MM-DD).'),

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
    .isNumeric()
    .withMessage('Duration must be a number.'),

  //|> DESCRIPTION
  check('description')
    .default(undefined)
    .if(check('description').exists())
    .trim(),

  //|> MEDIC
  check('MedicID')
    .default(undefined)
    .custom((value, { req }) => {
      if (!value) {
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
  XvalidateInfoTurn,
};
