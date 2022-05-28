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
  }
) {
  //|> allowNull:FALSE
  if (ruteType === 'POST' && (!title || !tuition_date || !tuition_number))
    throw new Error(
      '"title", "tuition_date" and "tuition_number" are required.'
    );

  //|> title: STRING, notEmpty
  if ((title && ruteType === 'PUT') || ruteType === 'POST') {
    if (!title.length) throw new Error('"title" cannot be an empty string.');
    if (
      !(
        typeof title === 'string' &&
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          title
        )
      )
    )
      throw new Error('"title" must be a valid text.');
  }

  //|> specialization: STRING, notEmpty
  if (specialization) {
    if (!specialization.length)
      throw new Error('"specialization" cannot be an empty string');
    if (
      !(
        typeof specialization === 'string' &&
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          specialization
        )
      )
    )
      throw new Error('"specialization" must be a valid text.');
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
      throw new Error('"tuition_date" must be a date (yyyy-mm-dd).');
  }

  //|> tuition_number: INTEGER, unique
  const medicByTuition = tuition_number
    ? await Medic.findOne({ where: { tuition_number } })
    : null;
  if (medicByTuition && ruteType === 'POST')
    throw new Error('The "tuition_number" already exists.');
  if (tuition_number && ruteType === 'PUT')
    throw new Error('The "tuition_number" cant be edited.');

  if (tuition_number && ruteType === 'POST') {
    if (`${tuition_number}`.length < 4)
      throw new Error(
        'The tuition_number number length must have more than 4 numbers'
      );

    if (!(typeof tuition_number === 'number'))
      throw new Error('"tuition_number" must be a number.');
  }

  return true;
}

module.exports = {
  validateInfoMedic,
};
