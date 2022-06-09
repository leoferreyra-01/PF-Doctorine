import React, { useEffect, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoClinic, getTurns, postTurn } from '../../../redux/actions';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import styles from './calendar.module.css';
import { parseISO } from 'date-fns';

// * Te importo la función para generar el arreglo de turnos libres. Haz 'ctrl + click' en ella para verla en detalle.

// * También te importo la función para convertir el formato fecha que te da el DateTimePicker a un formato que usa turnsAvailable.

import {
  turnsAvailable,
  dateToString,
  numberToHours,
  CONSULTATION,
  MIN_CONSULTATION_DATE,
} from '../../../helpers/validateTurn';

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

  // Para obtener los turnos futuros del paciente.
  const [PatientTurns, setPatientTurns] = useState([]);
  const funcSetPatientTurns = ID =>
    axios.get(`/turns/search?ID=${ID}`).then(res => {
      const futureTurns = res.data
        .filter(turn => new Date(turn.date) > new Date())
        .sort((a, b) => a.ID - b.ID); // de menor a mayor ID futuro para ver 1ero el turno más próximo.
      setPatientTurns(futureTurns);
    });

  // Para obtener PatientID y luego los turnos del paciente.
  const userEmail = JSON.parse(localStorage.getItem('loggedToken')).email;
  const [PatientID, setPatientID] = useState(null);
  const funcSetPatientID = () =>
    axios
      .get(`/patients/?email=${userEmail}`)
      .then(res => {
        setPatientID(res.data[0].Patient.ID);
        return res.data[0].Patient.ID;
      })
      .then(ID => funcSetPatientTurns(ID))
      .catch(err => console.error(err));

  // Para arreglo de turnos libres.
  const [availableTurns, setAvailableTurns] = useState([]);
  const [date, setDate] = useState(dateToString(new Date()));
  const turns = useSelector(state => state.unavailableTurns);
  const infoClinic = useSelector(state => state.infoClinics[0]);

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getInfoClinic());
    funcSetPatientID();
  }, []);

  const handleChange = impDate => {
    console.log('impDate => ', impDate);
    if (PatientTurns.filter(turn => turn.description === CONSULTATION).length)
      return toast.error('You already have a consultation turn!');

    if (impDate > MIN_CONSULTATION_DATE) {
      setDate(dateToString(impDate));

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
    } else toast.error('Choose a date from tomorrow onwards.');
  };

  const handleCkick = e => {
    e.preventDefault();

    try {
      const turn = JSON.parse(e.target.value);

      const infoTurn = {
        ...turn,
        description: CONSULTATION,
        PatientID,
        MedicID: 1,
        patientAccepts: true,
      };

      dispatch(postTurn(infoTurn));

      setAvailableTurns([]);
      funcSetPatientID();

      toast.success('Turn created successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong, try again.');
    }
  };

  const handleDelete = e => {
    // e.preventDefault(); No usar porque necesito que actualice el estado.
    axios
      .delete(`/turns/delete/${e.target.value}`)
      .then(res => {
        funcSetPatientID();
        toast.success('Turn deleted successfully.');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className={styles.container}>
      <h3>Choose a date from tomorrow onwards.</h3>
      <div className={styles.datepicker}>
        <DatePicker onChange={handleChange} value={parseISO(date)} />
      </div>
      <div className={styles.turnContainer}>
        {availableTurns.length ? (
          availableTurns.map((turn, idx) => (
            <div key={idx} className={styles.turns}>
              <button onClick={handleCkick} value={JSON.stringify(turn)}>
                SELECT
              </button>
              <p>Time: {numberToHours(turn.time)} hs</p>
              <p>Duration: {turn.duration * 60} min.</p>
            </div>
          ))
        ) : (
          <h3>No available turns</h3>
        )}
      </div>
      <h2>Your turns:</h2>
      {PatientTurns.length &&
        PatientTurns.map(turn => (
          <div key={turn.ID}>
            <h3>NEXT TURN</h3>
            <p>Date: {turn.date}</p>
            <p>Time: {numberToHours(turn.time)} hs</p>
            <p>Duration: {turn.duration * 60} min.</p>
            <p>Description: {turn.description}</p>
            <button onClick={handleDelete} value={turn.ID}>
              ❌ CANCEL
            </button>
          </div>
        ))}
    </div>
  );
}
