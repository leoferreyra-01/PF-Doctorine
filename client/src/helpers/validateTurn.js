/* 
  Una clínica tiene horarios de atención. Y días de atención.

  Un turno tiene un horario de inicio y final. Para un día determinado.

  1) Validar un turno para que encaje dentro del horario de la clínica.
  2) Validar un turno para que no se solape con otros.
*/

//#region experimental data
// eslint-disable-next-line
const officeHours = [
  [], // i = 0 = domingo
  [
    // lunes, de 8:30hs a 12:45hs, y de 17 a 21hs
    { min: 8.5, max: 12.75 },
    { min: 17, max: 21 },
  ],
  [
    { min: 8.5, max: 12.75 },
    { min: 17, max: 21 },
  ],
  [
    { min: 8.5, max: 12.75 },
    { min: 17, max: 21 },
  ],
  [
    { min: 8.5, max: 12.75 },
    { min: 17, max: 21 },
  ],
  [
    { min: 8.5, max: 12.75 },
    { min: 17, max: 21 },
  ],
  [], // i = 6 = sábado
];
// eslint-disable-next-line
const turns = [
  {
    date: '2022-05-30',
    time: 9.5,
    duration: 1,
  },
  {
    date: '2022-05-31',
    time: 10.5,
    duration: 1,
  },
  {
    date: '2022-05-30',
    time: 11.5,
    duration: 1,
  },
  {
    date: '2022-06-30',
    time: 11.5,
    duration: 1,
  },
];
// eslint-disable-next-line
const turn = {
  date: '2022-05-30',
  time: 8.5,
  duration: 1,
};
//#endregion

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
// console.log(validateTurnInOfficeHours(turn, officeHours));

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
// console.log(validateTurnBetweenTurnsInADay(turn, turns));

//|> VALIDATE TURN
function validateTurn(turn, turns, officeHours) {
  if (!validateTurnInOfficeHours(turn, officeHours)) return false;
  if (!validateTurnBetweenTurnsInADay(turn, turns)) return false;

  return true;
}
// console.log(validateTurn(turn, turns, officeHours));

/* 
  A la clínica se le añade una duración estándar para turnos de consultas, turnStandardDuration = 0.5 hs.

  Para la vista del Paciente.
  1) Elegir un día y mostrar los turnos disponibles. Crear una funsión de turnos disponibles.
  2) Elegir un turno y mostrar la información del mismo. Para luego con esa info crear un turno.
  3) Si el día no tiene turnos disponibles, mostrar un mensaje.
*/
// eslint-disable-next-line
const turnStandardDuration = 0.5;

//|> GET TURNS AVAILABLE
// Create a list of turns availables, based on a date and a turn standard duration.
// date: 'yyyy-mm-dd'. Provided by the user-patient.
// turnStandardDuration: FLOAT. Where 15min = 0.25. Provided by the infoClinic.
function turnsAvailable(
  turns = [],
  officeHours = [],
  duration = 0.5,
  date = ''
) {
  const turnsAvailable = [];

  for (let i = 0; i <= 24; i += duration) {
    const turn = {
      date,
      time: i,
      duration,
    };

    if (validateTurn(turn, turns, officeHours)) {
      turnsAvailable.push(turn);
    }
  }

  return turnsAvailable;
}
// console.table(
//   turnsAvailable(turns, officeHours, turnStandardDuration, '2022-05-30')
// );

//|> DATE TO STRING
function dateToString(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;

  return `${year}-${month}-${day}`;
}
// console.log(dateToString(new Date()));

//|> Number to Hours
function numberToHours(number) {
  let hours = Math.floor(number);
  let minutes = Math.round((number - hours) * 60);

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}

//|> DATE-TIME TO Number
function dateTimeToNumber(date) {
  return parseFloat((date.getHours() + date.getMinutes() / 60).toFixed(2));
}
// console.log(dateTimeToNumber(new Date()));

// Tipo de turno de consulta. Solo puede ser creado por el paciente.
const CONSULTATION = '#consult';

// TOMORROW
const today = new Date();
const extraDays = 0;
const MIN_CONSULTATION_DATE = today.setDate(today.getDate() + extraDays);

module.exports = {
  validateTurn,
  turnsAvailable,
  dateToString,
  numberToHours,
  CONSULTATION,
  MIN_CONSULTATION_DATE,
  dateTimeToNumber,
};
