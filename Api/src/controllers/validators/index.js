'use strict';
const { validateInfoUser } = require('./User');
const { validateInfoMedic } = require('./Medic');
const { validateInfoPatient } = require('./Patient');
const { validateModelID } = require('./ModelID');
const { validateTurnCollisions } = require('./TurnCollisions');

const validate = {
  InfoUser: validateInfoUser,
  InfoMedic: validateInfoMedic,
  InfoPatient: validateInfoPatient,
  ModelID: validateModelID,
  TurnCollisions: validateTurnCollisions,
};

module.exports = validate;
