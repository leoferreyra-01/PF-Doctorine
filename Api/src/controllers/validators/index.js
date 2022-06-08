'use strict';
const { xValidateInfoUser } = require('./User');
const { xValidateInfoMedic } = require('./Medic');
const { xValidateInfoPatient } = require('./Patient');
const { xValidateModelID } = require('./ModelID');
const { xValidateInfoTurn } = require('./Turn');
const {
  validateTurnCollisions,
  xValidateTurnCollisions,
} = require('./TurnCollisions');

const { xValidateResults } = require('./xValidateResults');

const validate = {
  GET: {
    Medic: [xValidateModelID('Medic', 'ID'), xValidateResults],
    Patient: [xValidateModelID('Patient', 'ID'), xValidateResults],
    Turn_PatientID: [xValidateModelID('Patient', 'ID'), xValidateResults],
    Turn: [xValidateModelID('Turn', 'ID'), xValidateResults],
  },

  POST: {
    Medic: [
      xValidateModelID('Clinic', 'ClinicID'),
      ...xValidateInfoUser,
      ...xValidateInfoMedic,
      xValidateResults,
    ],
    Patient: [...xValidateInfoUser, ...xValidateInfoPatient, xValidateResults],
    Turn: [...xValidateInfoTurn, xValidateTurnCollisions, xValidateResults],
  },

  PUT: {
    Medic: [
      xValidateModelID('Medic', 'ID'),
      xValidateModelID('Clinic', 'ClinicID'),
      ...xValidateInfoUser,
      ...xValidateInfoMedic,
      xValidateResults,
    ],
    Patient: [
      xValidateModelID('Patient', 'ID'),
      ...xValidateInfoUser,
      ...xValidateInfoPatient,
      xValidateResults,
    ],
    Turn: [
      xValidateModelID('Turn', 'ID'),
      ...xValidateInfoTurn,
      xValidateTurnCollisions,
      xValidateResults,
    ],
  },

  DELETE: {
    Medic: [xValidateModelID('Medic', 'ID'), xValidateResults],
    Patient: [xValidateModelID('Patient', 'ID'), xValidateResults],
    Turn: [xValidateModelID('Turn', 'ID'), xValidateResults],
  },

  // preload_db
  TurnCollisions: validateTurnCollisions,

  // general use
  xModelID: xValidateModelID,
  xResults: xValidateResults,
};

module.exports = validate;
