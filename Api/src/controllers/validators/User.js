'use strict';

function validateInfoUser({
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
}) {
  if (!(userType === 'Medic' || userType === 'Patient'))
    throw new Error('"userType" must be "Medic" or "Patient".');

  if (!(typeof document === 'number'))
    throw new Error('"document" must be a number.');

  if (
    !(
      typeof name === 'string' &&
      /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
        name
      )
    )
  )
    throw new Error('"name" must be a valid name.');

  if (
    !(
      typeof lastName === 'string' &&
      /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
        lastName
      )
    )
  )
    throw new Error('"lastName" must be a valid last name.');

  if (
    !(
      typeof birth === 'string' &&
      /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/.test(
        birth
      )
    )
  )
    throw new Error('"birth" must be a date (yyyy-MM-dd).');

  if (telephone) {
    if (
      !(
        typeof telephone === 'string' &&
        /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
          telephone
        )
      )
    )
      throw new Error(
        '"telephone" must be a valid format of telephone number.'
      );
  }

  if (cellphone) {
    if (
      !(
        typeof cellphone === 'string' &&
        /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
          cellphone
        )
      )
    )
      throw new Error(
        '"cellphone" must be a valid format of cellphone number.'
      );
  }

  if (street) {
    if (
      !(
        typeof street === 'string' &&
        /[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          street
        )
      )
    )
      throw new Error('"street" must be a valid street name.');
  }

  if (number) {
    if (!(typeof number === 'number'))
      throw new Error('"number" must be a street number.');
  }

  if (city) {
    if (
      !(
        typeof city === 'string' &&
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          city
        )
      )
    )
      throw new Error('"city" must be a valid city name.');
  }

  if (postalCode) {
    if (!(typeof postalCode === 'number'))
      throw new Error('"postalCode" must be a number.');
  }

  if (
    !(
      typeof email === 'string' &&
      /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(email)
    )
  )
    throw new Error('"email" must be a valid email.');

  if (
    !(
      typeof password === 'string' &&
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password)
    )
  )
    throw new Error(
      '"password" must be a valid password. At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
    );

  if (imageProfile) {
    if (
      !(
        typeof imageProfile === 'string' &&
        /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g.test(
          imageProfile
        )
      )
    )
      throw new Error('"imageProfile" must be a valid URL.');
  }
}

module.exports = {
  validateInfoUser,
};
