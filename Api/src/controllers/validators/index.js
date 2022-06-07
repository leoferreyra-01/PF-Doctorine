'use strict';
const { XvalidateInfoUser } = require('./User');
const { XvalidateInfoMedic } = require('./Medic');
const { XvalidateInfoPatient } = require('./Patient');
const { XvalidateModelID } = require('./ModelID');
const { XvalidateInfoTurn } = require('./Turn');
const {
  validateTurnCollisions,
  XvalidateTurnCollisions,
} = require('./TurnCollisions');

const { XvalidateResults } = require('./XvalidateResults');

const validate = {
  GET: {
    Medic: [XvalidateModelID('Medic', 'ID'), XvalidateResults],
    Patient: [XvalidateModelID('Patient', 'ID'), XvalidateResults],
    Turn_PatientID: [XvalidateModelID('Patient', 'ID'), XvalidateResults],
    Turn: [XvalidateModelID('Turn', 'ID'), XvalidateResults],
  },

  POST: {
    Medic: [
      XvalidateModelID('Clinic', 'ClinicID'),
      ...XvalidateInfoUser,
      ...XvalidateInfoMedic,
      XvalidateResults,
    ],
    Patient: [...XvalidateInfoUser, ...XvalidateInfoPatient, XvalidateResults],
    Turn: [...XvalidateInfoTurn, XvalidateTurnCollisions, XvalidateResults],
  },

  PUT: {
    Medic: [
      XvalidateModelID('Medic', 'ID'),
      XvalidateModelID('Clinic', 'ClinicID'),
      ...XvalidateInfoUser,
      ...XvalidateInfoMedic,
      XvalidateResults,
    ],
    Patient: [
      XvalidateModelID('Patient', 'ID'),
      ...XvalidateInfoUser,
      ...XvalidateInfoPatient,
      XvalidateResults,
    ],
    Turn: [
      XvalidateModelID('Turn', 'ID'),
      ...XvalidateInfoTurn,
      XvalidateTurnCollisions,
      XvalidateResults,
    ],
  },

  DELETE: {
    Medic: [XvalidateModelID('Medic', 'ID'), XvalidateResults],
    Patient: [XvalidateModelID('Patient', 'ID'), XvalidateResults],
    Turn: [XvalidateModelID('Turn', 'ID'), XvalidateResults],
  },

  // preload_db
  TurnCollisions: validateTurnCollisions,

  // general use
  xModelID: XvalidateModelID,
  xResults: XvalidateResults,
};

module.exports = validate;
