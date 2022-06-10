//|> SEQUELIZE
const { Treatment, Clinic } = require('../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');
//|> VALIDATOR
var validator = require('validator');

const {
  xValidateResults,
} = require('../controllers/validators/XvalidateResults');

const validateTreatments = [
  //|> ID
  check('ID', 'Must be a numeric.')
    .custom(value => {
      if (!value) {
        throw new Error('ID is required.');
      }
      return true;
    })
    .if(check('ID').exists())
    .isLength({ min: 4, max: 6 })
    .withMessage('the ID must be between 4 and 6 characters.')
    .isNumeric()
    .custom(async (value, { req }) => {
      // aplica solo para post
      if (req.method === 'POST' && value) {
        const TreatmentDB = await Treatment.findByPk(value);
        if (TreatmentDB)
          throw new Error(
            `ID ${value} already exists, please choose another ID!.`
          );
        return true;
      }
    })
    .custom(async (value, { req }) => {
      // aplica solo para pUT Revisar
      if (req.method === 'PUT' && value) {
        const TreatmentDB = await Treatment.findByPk(value);
        if (!TreatmentDB)
          throw new Error(
            `ID ${value} does not exist!, please choose another ID!.`
          );
        return true;
      }
    })
    .custom(async (value, { req }) => {
      // aplica solo para DELETE Revisar value que llega por parametro
      if (req.method === 'DELETE' && value) {
        const TreatmentDB = await Treatment.findByPk(value);
        if (!TreatmentDB)
          throw new Error(
            `ID ${value} does not exist!, please choose another ID!.`
          );
        return true;
      }
    }), //|> price
  check('price', 'Must be a Float.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('price is required.');
      }
      return true;
    })
    .custom((value, { req }) => {
      if (req.method === 'PUT' && !value) {
        throw new Error('price is required.');
      }
      return true;
    })
    .if(check('price').exists())
    .isFloat(),

  //|> treatmentType
  check('treatmentType', 'Must be a string.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('treatmentType is required.');
      }
      return true;
    })
    .if(check('treatmentType').exists())
    .isAlphanumeric('en-US', { ignore: ' _-' }),
  //|> description
  check('description', 'Must be a string.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('description is required.');
      }
      return true;
    })
    .if(check('description').exists())
    .isAlphanumeric('en-US', { ignore: ' _-.,' }),
  //|> ClinicID
  check('ClinicID')
    .if(check('ClinicID').exists())
    .custom(async value => {
      // aplica solo para POST
      const clinicDB = await Clinic.findByPk(value);
      if (!clinicDB) {
        throw new Error(`ID ${value} does not exist!.`);
      }
      return true;
    }),
  xValidateResults,
];

module.exports = { validateTreatments };
