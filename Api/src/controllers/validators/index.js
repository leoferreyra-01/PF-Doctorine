'use strict';
const { validateInfoUser, XvalidateInfoUser } = require('./User');
const { validateInfoMedic, XvalidateInfoMedic } = require('./Medic');
const { validateInfoPatient, XvalidateInfoPatient } = require('./Patient');
const { validateModelID, XvalidateModelID } = require('./ModelID');
const { XvalidateInfoTurn } = require('./Turn');
const {
  validateTurnCollisions,
  XvalidateTurnCollisions,
} = require('./TurnCollisions');

const { XvalidateResults } = require('./XvalidateResults');

const validate = {
  InfoUser: validateInfoUser,
  xInfoUser: XvalidateInfoUser,

  InfoMedic: validateInfoMedic,
  xInfoMedic: XvalidateInfoMedic,

  InfoPatient: validateInfoPatient,
  xInfoPatient: XvalidateInfoPatient,

  ModelID: validateModelID,
  xModelID: XvalidateModelID,

  xInfoTurn: XvalidateInfoTurn,
  TurnCollisions: validateTurnCollisions,
  xTurnCollisions: XvalidateTurnCollisions,

  xResults: XvalidateResults,
};

module.exports = validate;
