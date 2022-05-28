'use strict';
const { validateInfoUser } = require('./User');
const { validateInfoMedic } = require('./Medic');
const { validateInfoPatient } = require('./Patient');
const { validateModelID } = require('./ModelID');

const validate = {
  InfoUser: validateInfoUser,
  InfoMedic: validateInfoMedic,
  InfoPatient: validateInfoPatient,
  ModelID: validateModelID,
};

module.exports = validate;
