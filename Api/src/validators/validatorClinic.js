//|> SEQUELIZE
const { Clinic } = require('../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');
//|> VALIDATOR
var validator = require('validator');
const {
  xValidateResults,
} = require('../controllers/validators/XvalidateResults');
const validateClinic = [
  //|> ID
  check('ID')
    .if(check('ID').exists())
    .custom(async value => {
      // aplica solo para PUT
      const clinicById = await Clinic.findByPk(value);
      if (!clinicById) {
        throw new Error(`ID ${value} does not exist!.`);
      }
      return true;
    }),
  //|> name
  check('name', 'Must be a string.')
    .default(undefined)
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Name is required.');
      }
      return true;
    })

    .if(check('name').exists())
    .isString() // verifica que no sea null, vacio, o un numero
    .isLength({ min: 3 }) // que no tenga menos de 3 caracteres
    .custom(async (value, { req }) => {
      // aplica solo para POST
      if (req.method === 'POST' && value) {
        const clinicDB = await Clinic.findOne({
          where: { name: value },
        });
        if (clinicDB)
          throw new Error(
            `Name ${value} already exists, please choose another name!.`
          );
        return true;
      }
    }),
  //|> street
  check('street', 'Name must be alphabetic.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('street is required.');
      }
      return true;
    })
    .if(check('street').exists())
    .isLength({ min: 3 })
    .withMessage('Street must have at least 3 characters.')
    .isAlphanumeric('en-US', { ignore: ' _-' }), // ignora los espacios y el - verifica si es alfanumerico o si es solo alfabetico, si no es null o vacio
  //|> number
  check('number', 'number Must be a numeric.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('number is required.');
      }
      return true;
    })
    .if(check('number').exists())
    .isNumeric(), // verifica que no sea null, bouliano, vacio o string
  //|> city
  check('city', ' City must be a alphabetic.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('city is required.');
      }
      return true;
    })
    .if(check('city').exists())
    .isLength({ min: 3 })
    .withMessage('City must have at least 3 characters.')
    .isAlpha('en-US', { ignore: ' _-' }), // ignora los espacios y el - verifica si es  si es solo alfabetico, si no es null o vacio
  //|> postalcode
  check('postalcode', 'Postal code must be a numeric.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('postalcode is required.');
      }
      return true;
    })
    .if(check('postalcode').exists())
    .isLength({ min: 4 })
    .withMessage('Postal code must have at least 4 digits.')
    .isNumeric(),
  //|> telephone
  check('telephone', 'Telephone must be a valid phone number.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('telephone is required.');
      }
      return true;
    })
    .if(check('telephone').exists())
    .notEmpty()
    .custom(value =>
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
        value
      )
    ),
  //|> email
  check('email', 'Email must be valid.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Email is required.');
      }
      return true;
    })
    .if(check('email').exists())
    .isEmail(),
  //|> officeHours
  check('officeHours', 'Must be a json.')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('officeHours is required.');
      }
      return true;
    })
    .if(check('officeHours').exists())
    .isJSON(),

  //|> imgLogo
  check('imgLogo', 'Must be a URL.')
    .if(check('imgLogo').exists())
    .isURL()
    .withMessage('Image profile must be a valid URL.')
    .custom(value => {
      const imgFormat = value.slice(value.length - 4);
      console.log(typeof imgFormat);
      if (imgFormat !== '.jpg') {
        if (imgFormat !== '.png')
          throw new Error('Image profile must be a valid image format.');
      }
      return true;
    }),
  xValidateResults,
];

module.exports = { validateClinic };
