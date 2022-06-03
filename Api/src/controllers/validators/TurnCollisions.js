'use strict';

//|> SEQUELIZE
const { Turn, Medic, Clinic } = require('../../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

//|+| Tested on routerTurns! ✔️
const XvalidateTurnCollisions = check('medic')
  .default(undefined)
  .custom((value, { req }) => {
    if (!value) {
      throw new Error('Medic is required.');
    }
    return true;
  })
  .if(check('medic').exists())
  .trim()
  .isInt()
  .withMessage('Medic must be a number.')

  //|> VALIDATE TURN INTO OFFICE-HOURS
  .custom(async (medic, { req }) => {
    // get infoTurn
    let infoTurn = req.body;

    //get oldInfoTurn
    let oldInfoTurn = {};
    let { id } = req.params;
    if (id) oldInfoTurn = (await Turn.findByPk(id)).dataValues;

    // get officeHours
    let getMedic = (await Medic.findByPk(medic)).dataValues;
    let getClinic = (await Clinic.findByPk(getMedic.ClinicID)).dataValues;
    let officeHours = JSON.parse(getClinic.officeHours);

    infoTurn = {
      // update options.
      ...oldInfoTurn,
      ...infoTurn,
    };

    if (!validateTurnInOfficeHours(infoTurn, officeHours))
      throw new Error('The turn is out of office hours.');

    return Promise.resolve();
  })

  //|> VALIDATE TURN BETWEEN TURNS IN THE SAME DAY
  .custom(async (medic, { req }) => {
    // get Turns
    let Turns = (await Turn.findAll()).map(turn => turn.dataValues);

    // get infoTurn
    let infoTurn = req.body;

    //get oldInfoTurn
    let oldInfoTurn = {};
    let { id } = req.params;
    if (id) oldInfoTurn = (await Turn.findByPk(id)).dataValues;

    infoTurn = {
      // update options.
      ...oldInfoTurn,
      ...infoTurn,
    };
    if (!validateTurnBetweenTurnsInADay(infoTurn, Turns))
      throw new Error('The turn time and duration collide with another turn.');

    return Promise.resolve();
  });

//|+| Tested on preload_db! ✔️
async function validateTurnCollisions(
  infoTurn,
  TurnID = null, // for update options.
  Turns = [], // for Frontend redux-store
  officeHours = [] // for Frontend redux-store
) {
  //|> PRELOADS
  if (!Turns.length)
    Turns = (await Turn.findAll()).map(turn => turn.dataValues);

  if (TurnID) {
    const oldInfoTurn = (await Turn.findByPk(TurnID)).dataValues;
    infoTurn = {
      ...oldInfoTurn,
      ...infoTurn,
    };
  }

  if (!officeHours.length) {
    const getMedic = (await Medic.findByPk(infoTurn.MedicID)).dataValues;
    const getClinic = (await Clinic.findByPk(getMedic.ClinicID)).dataValues;
    officeHours = JSON.parse(getClinic.officeHours);
  }

  //|> ERRORS
  let validation = true;
  const Errors = {};

  //|> VALIDATIONS
  if (!validateTurn(infoTurn, Turns, officeHours)) validation = false;

  if (!validateTurnInOfficeHours(infoTurn, officeHours))
    Errors.officeHours = 'The turn is out of office hours.';

  if (!validateTurnBetweenTurnsInADay(infoTurn, Turns))
    Errors.time = 'The turn time and duration collide with another turn.';

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
function validateTurnBetweenTurnsInADay(turn, turns) {
  turns = turns.filter(turnX => turnX.date === turn.date);

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
  if (!validateTurnInOfficeHours(turn, officeHours)) return false;
  if (!validateTurnBetweenTurnsInADay(turn, turns)) return false;

  return true;
}

module.exports = { validateTurnCollisions, XvalidateTurnCollisions };
