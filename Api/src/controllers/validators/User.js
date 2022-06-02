'use strict';
//|> SEQUELIZE
const { User } = require('../../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');
const { formatName } = require('./customSanitizer.js');
//|> VALIDATOR
const validator = require('validator');

const XvalidateInfoUser = [
  //|> userType
  check('infoUser.userType').customSanitizer((value, { req }) => {
    if (req.baseUrl === '/patients') value = 'Patient';
    if (req.baseUrl === '/medics') value = 'Medic';
    return value;
  }),

  //|> document
  check('infoUser.document')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Document is required.');
      }
      return true;
    })
    .if(check('infoUser.document').exists())
    .custom((value, { req }) => {
      if (req.method === 'PUT') {
        throw new Error(`Document ${value} cant be edited.`);
      }
      return true;
    })
    .isNumeric()
    .withMessage('Document must be numeric.')
    .isInt({ min: 1 })
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Document must have 8 or more digits.')
    .bail()
    .custom(async value => {
      // PRELOADS
      const user = await User.findOne({
        where: { document: value },
      });

      // ID exist
      if (user) throw new Error(`Document ${value} already exists.`);

      return true;
    })
    .trim(),

  //|> name
  check('infoUser.name')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Name is required.');
      }
      return true;
    })
    .if(check('infoUser.name').exists())
    .custom(value => {
      if (validator.isAlpha(value, 'es-ES', { ignore: ' ' })) return true;
      throw new Error('Name must be alphabetic.');
    })
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Name must have at least 3 characters.')
    .customSanitizer(formatName)
    .trim(),

  //|> lastName
  check('infoUser.lastName')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Name is required.');
      }
      return true;
    })
    .if(check('infoUser.lastName').exists())
    .custom(value => {
      if (validator.isAlpha(value, 'es-ES', { ignore: ' ' })) return true;
      throw new Error('Name must be alphabetic.');
    })
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Lastname must have at least 3 characters.')
    .customSanitizer(formatName)
    .trim(),

  //|> birth
  check('infoUser.birth')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Name is required.');
      }
      return true;
    })
    .if(check('infoUser.birth').exists())
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Birth must be a date format (YYYY-MM-DD).')
    .trim(),

  //|> telephone
  check('infoUser.telephone')
    .if(check('infoUser.telephone').exists())
    .notEmpty()
    .custom(value =>
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
        value
      )
    )
    .withMessage('Telephone must be a valid phone number.')
    .trim(),

  //|> cellephone
  check('infoUser.cellphone')
    .if(check('infoUser.cellphone').exists())
    .notEmpty()
    .custom(value =>
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
        value
      )
    )
    .withMessage('Cellphone must be valid cellphone number.')
    .trim(),

  //|> street
  check('infoUser.street')
    .if(check('infoUser.street').exists())
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Street must have at least 3 characters.')
    .custom(value => {
      if (validator.isAlphanumeric(value, 'es-ES', { ignore: ' ' }))
        return true;
      throw new Error('Name must be alphabetic.');
    })
    .customSanitizer(formatName)
    .trim(),

  //|> number
  check('infoUser.number')
    .if(check('infoUser.number').exists())
    .notEmpty()
    .isNumeric()
    .withMessage('Number must be numeric.'),

  //|> city
  check('infoUser.city')
    .if(check('infoUser.city').exists())
    .custom(value => {
      if (validator.isAlphanumeric(value, 'es-ES', { ignore: ' ' }))
        return true;
      throw new Error('Name must be alphabetic.');
    })
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('City must have at least 3 characters.')
    .customSanitizer(formatName)
    .trim(),

  //|> postalCode
  check('infoUser.postalCode')
    .if(check('infoUser.postalCode').exists())
    .isNumeric()
    .withMessage('Postal code must be numeric.')
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage('Postal code must have at least 4 digits.'),

  //|> email
  check('infoUser.email')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !value) {
        throw new Error('Name is required.');
      }
      return true;
    })
    .if(check('infoUser.email').exists())
    .notEmpty()
    .isEmail()
    .withMessage('Email must be valid.')
    .normalizeEmail()
    .bail()
    .custom(async value => {
      // PRELOADS
      const user = await User.findOne({
        where: { email: value },
      });

      // email exist
      if (user) throw new Error(`Email ${value} already exists.`);

      return true;
    })
    .trim(),

  //|> password
  check('infoUser.password')
    .if(check('infoUser.password').exists())
    .notEmpty()
    .custom(value => {
      if (
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        })
      )
        return true;
      throw new Error(
        'Password must be a valid password. At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
      );
    }),

  //|> imageProfile
  check('infoUser.imageProfile')
    .if(check('infoUser.imageProfile').exists({ checkFalsy: true }))
    .isURL()
    .withMessage('Image profile must be a valid URL.')
    .custom(value => {
      const imgFormat = value.slice(value.length - 4);
      if (imgFormat !== '.jpg' || imgFormat !== '.png') {
        throw new Error('Image profile must be a valid image format.');
      }
      return true;
    })
    .trim(),
];

async function validateInfoUser(
  ruteType = 'POST',
  {
    // infoUser
    userType,
    document,
    name,
    lastName,
    birth,
    telephone,
    cellphone,
    street,
    number,
    city,
    postalCode,
    email,
    password,
    imageProfile,
  },
  Users = []
) {
  //|> PRELOADS
  if (!Users.length)
    Users = (await User.findAll()).map(user => user.dataValues);

  //|> ERRORS
  let validation = true;
  const Errors = {};

  //|> allowNull: FALSE
  if (
    ruteType === 'POST' &&
    (!userType || !document || !name || !lastName || !birth || !email)
  )
    Errors.fieldsRequired =
      '{userType, document, name, lastName, birth, email,} are required.';

  //|> userType: default:Patient.
  if ((userType && ruteType === 'PUT') || ruteType === 'POST') {
    if (!(userType === 'Medic' || userType === 'Patient'))
      Errors.userType = "Must be 'Medic' or 'Patient'.";
  }

  //|> document: INTEGER, length:8, unique.
  const userByDocument = document
    ? Users.find(user => user.document === document)
    : null;
  if (userByDocument && ruteType === 'POST')
    Errors.document = 'The number already exists.';
  if (userByDocument && ruteType === 'PUT')
    Errors.document = 'The number cant be edited.';

  if (document && ruteType === 'POST') {
    if (`${document}`.length !== 8)
      Errors.document = 'The number length must be 8 numbers';

    if (!(typeof document === 'number')) Errors.document4 = 'Must be a number.';
  }

  //|> name: STRING.
  if ((name && ruteType === 'PUT') || ruteType === 'POST') {
    if (
      !(
        typeof name === 'string' &&
        /[^0-9\.\,\\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          name
        )
      )
    )
      Errors.name = 'Must be a valid only-text.';
  }

  //|> lastName: STRING.
  if ((lastName && ruteType === 'PUT') || ruteType === 'POST') {
    if (
      !(
        typeof lastName === 'string' &&
        /[^0-9\.\,\\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          lastName
        )
      )
    )
      Errors.lastName = 'Must be a valid only-text.';
  }

  //|> birth: STRING.
  if ((birth && ruteType === 'PUT') || ruteType === 'POST') {
    if (
      !(
        typeof birth === 'string' &&
        /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/.test(
          birth
        )
      )
    )
      Errors.birth = 'Must be a date (yyyy-MM-dd).';
  }

  //|> telephone: allowNull: TRUE, INTEGER.
  if (telephone) {
    if (
      !(
        typeof telephone === 'string' &&
        /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
          telephone
        )
      )
    )
      Errors.telephone = 'Must be a valid string-format of telephone number.';
  }

  //|> cellphone: allowNull: TRUE, INTEGER.
  if (cellphone) {
    if (
      !(
        typeof cellphone === 'string' &&
        /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
          cellphone
        )
      )
    )
      Errors.cellphone = 'Must be a valid string-format of cellphone number.';
  }

  //|> street: allowNull: TRUE, STRING.
  if (street) {
    if (
      !(
        typeof street === 'string' &&
        /[^\.\,\\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          street
        )
      )
    )
      Errors.street = 'Must be a valid street name.';
  }

  //|> number: allowNull: TRUE, INTEGER.
  if (number) {
    if (!(typeof number === 'number'))
      Errors.number = 'Must be a street number.';
  }

  //|> city: allowNull: TRUE, STRING.
  if (city) {
    if (
      !(
        typeof city === 'string' &&
        /[^0-9\.\,\\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          city
        )
      )
    )
      Errors.city = 'Must be a valid city name.';
  }

  //|> postalCode: allowNull: TRUE, INTEGER.
  if (postalCode) {
    if (!(typeof postalCode === 'number'))
      Errors.postalCode = 'Must be a number.';
  }

  //|> email: STRING, unique.
  const userByEmail = email ? Users.find(user => user.email === email) : null;
  if (userByEmail) Errors.email = 'The email already exists.';
  if ((email && ruteType === 'PUT') || ruteType === 'POST') {
    if (
      !(
        typeof email === 'string' &&
        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(email)
      )
    )
      Errors.email = 'Must be a valid email-format.';
  }

  //|> password: STRING.
  if ((password && ruteType === 'PUT') || (password && ruteType === 'POST')) {
    if (
      !(
        typeof password === 'string' &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password)
      )
    )
      Errors.password =
        'Must be a valid password. At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.';
  }

  //|> imageProfile: allowNull: TRUE, STRING.
  if (imageProfile) {
    if (
      !(
        typeof imageProfile === 'string' &&
        /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g.test(
          imageProfile
        )
      )
    )
      Errors.imageProfile = 'Must be a valid URL.';
  }

  //|> RESULTS
  if (Object.keys(Errors).length) validation = false;

  return [validation, Errors];
}

module.exports = {
  validateInfoUser,
  XvalidateInfoUser,
};
