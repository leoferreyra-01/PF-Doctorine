'use strict';
//|> SEQUELIZE
const { Medic } = require('../../db');

async function validateInfoMedic(
  ruteType = 'POST',
  {
    // infoMedic
    title,
    specialization,
    tuition_date,
    tuition_number,
  },
  Medics = []
) {
  if (!Medics.length)
    Medics = (await Medic.findAll()).map(medic => medic.dataValues);

  //|> VALIDATIONS
  let validation = true;
  const Errors = {};

  //|> allowNull:FALSE
  if (ruteType === 'POST' && (!title || !tuition_date || !tuition_number))
    Errors.fieldsRequired =
      '{title, tuition_date, tuition_number} are required.';

  //|> title: STRING, notEmpty
  if ((title && ruteType === 'PUT') || ruteType === 'POST') {
    if (!title) Errors.title = 'Can not be an empty string.';
    if (
      !(
        typeof title === 'string' &&
        /[^0-9\.\,\\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          title
        )
      )
    )
      Errors.title = 'Must be a valid only-text format.';
  }

  //|> specialization: STRING, notEmpty
  if (specialization) {
    if (!specialization.length)
      Errors.specialization = 'Can not be an empty string';
    if (
      !(
        typeof specialization === 'string' &&
        /[^0-9\.\,\\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          specialization
        )
      )
    )
      Errors.specialization = 'Must be a valid text.';
  }

  //|> tuition_date: DATE(yyyy-mm-dd),
  if ((tuition_date && ruteType === 'PUT') || ruteType === 'POST') {
    if (
      !(
        typeof tuition_date === 'string' &&
        /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/.test(
          tuition_date
        )
      )
    )
      Errors.tuition_date = 'Must be a date (yyyy-mm-dd).';
  }

  //|> tuition_number: INTEGER, unique
  const medicByTuition = tuition_number
    ? Medics.find(medic => medic.tuition_number === tuition_number)
    : null;
  if (medicByTuition && ruteType === 'POST')
    Errors.tuition_number = 'The {tuition_number} already exists.';
  if (tuition_number && ruteType === 'PUT')
    Errors.tuition_number = 'The {tuition_number} cant be edited.';

  if (tuition_number && ruteType === 'POST') {
    if (`${tuition_number}`.length < 4)
      Errors.tuition_number =
        'The {tuition_number} number length must have more than 4 numbers';

    if (!(typeof tuition_number === 'number'))
      Errors.tuition_number = 'Must be a number.';
  }

  //|> RESULTS
  if (Object.keys(Errors).length) validation = false;

  return [validation, Errors];
}

module.exports = {
  validateInfoMedic,
};
