import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

// * Te importo la función para generar el arreglo de turnos libres. Haz 'ctrl + click' en ella para verla en detalle.

// * También te importo la función para convertir el formato fecha que te da el DateTimePicker a un formato que usa turnsAvailable.

// import {
//   turnsAvailable,
//   dateToString,
// } from '../../../../../Api/src/controllers/validators/TurnCollisions.js';

//|> IMFORMACIÓN REQUERIDA: Arreglo de turnos libres.

// turnsAvailable(turns, officeHours, turnStandardDuration, date);

// * turns = unavailableTurns => Redux-Store.
// * infoClinic = infoClinics[0] => Redux-Store.
// * officeHours = JSON.parse(infoClinic.officeHours).
// * turnStandardDuration = infoClinic.turnStandardDuration.
// * date = dateToString(date). Donde 'date' es la fecha en formato 'new date()' que crea el componente DatePicker.

/*
|>        IMFORMACIÓN REQUERIDA: Posteo de turno nuevo.
  const infoTurn = {
    date: date,             // dato del turnsAvailable elegido.
    time: 9,                // dato del turnsAvailable elegido.
    duration: 1,            // dato del turnsAvailable elegido.
    description: '...',     // dato elegido por le usuario.
    patientAccepts: true,   // El paciente acepta el turno.
    PatientID: 1,           // El ID del usuario logueado.
    MedicID: 1,             // El único médico que tenemos
  }
*/

//|> REGLAS ESPECIALES (ver luego)
// * El usuario no puede elegir una fecha que ya haya pasado o del mismo día. Notificar el error.
// * El usuario no puede crear un turno si ya hay un turno futuro existente. Notificar el error.
// * El usuario solo puede elegir un turno libre de los listados por turnsAvailable.
// * El usuario debe recibir una notificación cuando el turno sea cargodo, avisando que le llegará un mensaje de confirmación por parte del médico al e-mail o teléfono.
// * El usuario debe poder eliminar el turno creado.

//|> NOTAS (ver más tarde)
// * patientAccepts = true => El paciente acepta el turno.
// * medicAccepts es el campo equivalente del lado del médico. Si el paciente acepta el turno, el médico debe aceptarlo.
// * Cuando este componente se use para el Médico, el post se envia con el campo medicAccepts = true. Si el medico acepta el turno, el paciente debe aceptarlo.
// * Cuando patientAccepts y medicAccepts son true, una notificación debe ser enviada a ambos.

export default function CalendarFunction() {
  const [date, setDate] = useState(new Date());
  // console.log(dateToString(date))
  console.log(date);
  //Wed Jun 08 2022 08:34:16 GMT-0300 (hora estándar de Argentina)
  console.log(new Date());
  const handleChange = date => {
    setDate(date);
  };

  return <DatePicker onChange={handleChange} value={date} />;
}
