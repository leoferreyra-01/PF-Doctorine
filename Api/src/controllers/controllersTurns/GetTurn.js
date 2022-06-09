'use strict';

//|> SEQUELIZE
const { Op } = require('sequelize');
const { User, Medic, Patient, Turn } = require('../../db');

//|> CONTROLLER

// async function getTurns() {
//   const turndate = await Turn.findAll({
//     include: [Patient, Medic],
//   });

//   let res = await turndate.map(t => t.dataValues);

//   return res;
// }

// async function getTurnsid(UserID) {
//   const searchid = await Turn.findByPk(UserID, {
//     where: { ID: UserID },
//     include: [Patient, Medic],
//   });

//   return searchid;
// }

// async function getTurnsidP(UserID) {
//   const searchid = await Turn.findAll({
//     where: { PatientID: UserID },
//     include: [Patient, Medic],
//   });

//   return searchid;
// }

async function getTurnsByID(IDs) {
  let TurnID = IDs?.TurnID;
  let MedicID = IDs?.MedicID;
  let PatientID = IDs?.PatientID;

  //|> Data to search
  let UserMedicID = null;
  let UserPatientID = null;

  let turn = null;
  let medic = null;
  let patient = null;

  let userMedic = null;
  let userPatient = null;

  if (TurnID) {
    turn = (await Turn.findByPk(TurnID)).dataValues;
    MedicID = turn.MedicID;
    PatientID = turn.PatientID;
  }

  if (MedicID) {
    medic = (await Medic.findByPk(MedicID)).dataValues;
    UserMedicID = medic.UserID;
    userMedic = (await User.findByPk(UserMedicID)).dataValues;
  }

  if (PatientID) {
    patient = (await Patient.findByPk(PatientID)).dataValues;
    UserPatientID = patient.UserID;
    userPatient = (await User.findByPk(UserPatientID)).dataValues;
  }

  //|> Posible result
  if (TurnID) {
    return {
      ...turn,
      Medic: medic,
      Patient: patient,
      userMedic,
      userPatient,
    };
  }

  if (MedicID) {
    const turns = (
      await Turn.findAll({
        where: { MedicID },
      })
    ).map(t => t.dataValues);

    return Promise.all(turns.map(turn => getTurnsByID({ TurnID: turn.ID })));
  }

  if (PatientID) {
    const turns = (
      await Turn.findAll({
        where: { PatientID },
      })
    ).map(t => t.dataValues);

    return Promise.all(turns.map(turn => getTurnsByID({ TurnID: turn.ID })));
  }

  const turns = (await Turn.findAll()).map(t => t.dataValues);

  return Promise.all(turns.map(turn => getTurnsByID({ TurnID: turn.ID })));
}

module.exports = {
  // getTurns,
  // getTurnsid,
  // getTurnsidP,
  getTurnsByID,
};
