import React, { useEffect, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoClinic, getTurns } from '../../../redux/actions';

// * Te importo la función para generar el arreglo de turnos libres. Haz 'ctrl + click' en ella para verla en detalle.

// * También te importo la función para convertir el formato fecha que te da el DateTimePicker a un formato que usa turnsAvailable.

import { turnsAvailable, dateToString } from '../../../helpers/validateTurn';

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
  const dispatch = useDispatch();

  // Para arreglo de turnos libres.
  const [date, setDate] = useState(dateToString(new Date()));
  const turns = useSelector(state => state.unavailableTurns);
  const infoClinic = useSelector(state => state.infoClinics[0]);

  const [availableTurns, setAvailableTurns] = useState({});

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getInfoClinic());
  }, []);

  const handleChange = impDate => {
    if (impDate > new Date()) {
      setDate(dateToString(impDate));
      console.log(dateToString(impDate));

      const officeHours = JSON.parse(infoClinic.officeHours);
      const turnStandardDuration = infoClinic.turnStandardDuration;

      setAvailableTurns(
        turnsAvailable(
          turns,
          officeHours,
          turnStandardDuration,
          dateToString(impDate)
        )
      );
      console.log(officeHours);
      console.log(turnStandardDuration);
      console.log(availableTurns);
    } else alert('You cannot select a date in the past');
  };

  return (
    <>
      <h3>Pick a date from tomorrow.</h3>
      <DatePicker onChange={handleChange} value={date} />
      {availableTurns.length ? (
        availableTurns.map((turn, idx) => (
          <div key={idx}>
            <p>{turn.date}</p>
            <p>{turn.time}</p>
            <p>{turn.duration}</p>
          </div>
        ))
      ) : (
        <h3>No available turns</h3>
      )}
    </>
  );
}
