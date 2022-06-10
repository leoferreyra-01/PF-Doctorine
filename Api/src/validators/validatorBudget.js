//|> SEQUELIZE
const { Budget, Patient } = require('../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');
//|> VALIDATOR
var validator = require('validator');

const {
  xValidateResults,
} = require('../controllers/validators/XvalidateResults');

const validateBudget = [
  //|> ID
  check('ID')
    .if(check('ID').exists())
    .custom(async value => {
      // aplica solo para PUT
      const BudgetByPatient = await Budget.findByPk(value);
      if (!BudgetByPatient) {
        throw new Error(`ID ${value} does not exist!.`);
      }
      return true;
    }),
  //|> paid
  // aplica solo para PUT
  check('paid', 'Must be a string.').if(check('paid').exists()).isBoolean(),
  //|> PatientID
  check('PatientID')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('PatientID is required.');
      }
      return true;
    })
    .if(check('PatientID').exists())
    .custom(async value => {
      //aplica solo para POST
      const PatientDB = await Patient.findByPk(value);
      if (!PatientDB) {
        throw new Error(`ID ${value} the patient does not exist!.`);
      }

      return true;
    }),
  //|> treatments
  // aplica solo para POST
  check('treatments', 'Must be a json.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('treatments is required.');
      }
      return true;
    })
    .if(check('treatments').exists())
    .isJSON(),
  //|> discount
  // aplica solo para POST
  check('discount', 'Must be a Float.')
    .default(undefined)
    .if(check('discount').exists())
    .isFloat(),
  //|> totalPrice
  // aplica solo para POST
  check('totalPrice', 'Must be a Float.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('totalPrice is required.');
      }
      return true;
    })
    .if(check('totalPrice').exists())
    .isFloat(),
  xValidateResults,
];

module.exports = { validateBudget };
