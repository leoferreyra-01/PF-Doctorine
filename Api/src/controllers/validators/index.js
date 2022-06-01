'use strict';
const { validateInfoUser } = require('./User');
const { validateInfoMedic } = require('./Medic');
const { validateInfoPatient, XvalidateInfoPatient } = require('./Patient');
const { validateModelID, XvalidateModelID } = require('./ModelID');
const { validateTurnCollisions } = require('./TurnCollisions');

const { XvalidateResults } = require('./XvalidateResults');

const validate = {
  InfoUser: validateInfoUser,
  InfoMedic: validateInfoMedic,

  InfoPatient: validateInfoPatient,
  xInfoPatient: XvalidateInfoPatient,

  ModelID: validateModelID,
  xModelID: XvalidateModelID,

  TurnCollisions: validateTurnCollisions,
  xResults: XvalidateResults,
};

module.exports = validate;
