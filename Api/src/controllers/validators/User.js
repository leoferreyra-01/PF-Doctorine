'use strict';
//|> SEQUELIZE
const { User } = require('../../db');

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
};
