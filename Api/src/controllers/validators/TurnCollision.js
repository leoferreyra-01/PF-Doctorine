'use strict';

//|> SEQUELIZE
const { Turn, Clinic } = require('../../db');

async function validateTurnCollisions(
  ruteType = 'POST',
  infoTurn,
  Turns = [],
  officeHours = []
) {
  //|> PRELOADS
  if (!Turns.length)
    Turns = (await Turn.findAll()).map(turn => turn.dataValues);

  if (!officeHours.length) {
    // const getMedic
    // const ClinicID
    // const getClinic
    // officeHours =
  }

  //|> ERRORS
  let validation = true;
  const Errors = {};

  //|> VALIDATIONS

  //|> RESULTS
  if (Object.keys(Errors).length) validation = false;

  return [validation, Errors];
}

//|> VALIDATE TURN INTO OFFICE-HOURS
function validateTurnInOfficeHours(turn, officeHours) {
  const turnDay = new Date(turn.date).getUTCDay();
  const officeDay = officeHours[turnDay];
  const turnMin = turn.time;
  const turnMax = turn.time + turn.duration;

  for (let i = 0; i < officeDay.length; i++) {
    if (turnMin >= officeDay[i].min && turnMax <= officeDay[i].max) return true;
  }

  return false;
}

//|> VALIDATE TURN BETWEEN TURNS IN THE SAME DAY
function validateTurnBetweenTurnsInADAy(turn, turns) {
  for (let i = 0; i < turns.length; i++) {
    if (
      (turn.time >= turns[i].time ||
        turn.time + turn.duration > turns[i].time) &&
      turn.time < turns[i].time + turns[i].duration
    )
      return false;
  }

  return true;
}

//|> VALIDATE TURN
function validateTurn(turn, turns, officeHours) {
  turns = turns.filter(turnX => turnX.date === turn.date);

  if (!validateTurnInOfficeHours(turn, officeHours)) return false;
  if (!validateTurnBetweenTurnsInADAy(turn, officeHours)) return false;

  return true;
}

module.exports = { validateTurnCollisions };
