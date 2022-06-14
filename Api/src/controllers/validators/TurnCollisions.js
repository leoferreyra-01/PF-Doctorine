'use strict';

//|> SEQUELIZE
const { Turn, Medic, Clinic } = require('../../db');
//|> EXPRESS-VALIDATOR
const { check } = require('express-validator');

//|+| Tested on routerTurns! ✔️
const xValidateTurnCollisions = check('time')
  .default(undefined)
  .custom((value, { req }) => {
    if (!value) {
      throw new Error('Time is required.');
    }
    return true;
  })
  //|> VALIDATE TURN INTO OFFICE-HOURS
  .custom(async (value, { req }) => {
    const MedicID = req.body.MedicID;
    // get infoTurn
    let infoTurn = req.body;

    //get oldInfoTurn
    let oldInfoTurn = {};
    let { ID } = req.params;
    if (ID) oldInfoTurn = (await Turn.findByPk(ID)).dataValues;

    // get officeHours
    let getMedic = (await Medic.findByPk(MedicID)).dataValues;
    let getClinic = (await Clinic.findByPk(getMedic.ClinicID)).dataValues;
    let officeHours = JSON.parse(getClinic.officeHours);

    infoTurn = {
      // update options.
      ...oldInfoTurn,
      ...infoTurn,
    };

    // console.log('ID: ', ID);
    // console.log('infoTurn: ', infoTurn);
    // console.log('officeHours: ', officeHours);

    if (!validateTurnInOfficeHours(infoTurn, officeHours))
      throw new Error(
        `The time (${infoTurn.time}) and duration (${infoTurn.duration}) is out of office hours.`
      );

    return Promise.resolve();
  })

  //|> VALIDATE TURN BETWEEN TURNS IN THE SAME DAY
  .custom(async (value, { req }) => {
    // get Turns
    let Turns = (await Turn.findAll()).map(turn => turn.dataValues);

    // get infoTurn
    let infoTurn = req.body;

    //get oldInfoTurn
    let oldInfoTurn = {};
    let { ID } = req.params;
    if (ID) oldInfoTurn = (await Turn.findByPk(ID)).dataValues;

    infoTurn = {
      // update options.
      ...oldInfoTurn,
      ...infoTurn,
    };

    Turns = Turns.filter(turn => turn.ID !== infoTurn.ID);

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
  const turnMin = parseFloat(turn.time);
  const turnMax = parseFloat(turn.time) + parseFloat(turn.duration);

  // console.log('----------------------------------------');
  // console.log(
  //   'Office Hours: ',
  //   [
  //     'Sunday',
  //     'Monday',
  //     'Tuesday',
  //     'Wednesday',
  //     'Thursday',
  //     'Friday',
  //     'Saturday',
  //   ][turnDay]
  // );
  // console.table(officeDay);

  for (let i = 0; i < officeDay.length; i++) {
    if (turnMin >= officeDay[i].min && turnMax <= officeDay[i].max) {
      // console.log('turnMin: ', turnMin, '||', 'turnMax: ', turnMax, '✔️');
      return true;
    }
  }

  // console.log('turnMin: ', turnMin, '||', 'turnMax: ', turnMax, '❌');
  return false;
}

//|> VALIDATE TURN BETWEEN TURNS IN THE SAME DAY
function validateTurnBetweenTurnsInADay(turn, turns) {
  turns = turns.filter(turnX => turnX.date === turn.date);

  const turnMin = parseFloat(turn.time);
  const turnMax = parseFloat(turn.time) + parseFloat(turn.duration);

  for (let i = 0; i < turns.length; i++) {
    const turnXmin = parseFloat(turns[i].time);
    const turnXmax = parseFloat(turns[i].time) + parseFloat(turns[i].duration);

    if ((turnMin >= turnXmin || turnMax > turnXmin) && turnMin < turnXmax)
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

module.exports = {
  validateTurnCollisions,
  xValidateTurnCollisions,
};
