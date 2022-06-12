import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTurns } from '../../../redux/actions';
import { DatePicker } from '@material-ui/pickers';
import Swal from 'sweetalert2';
import axios from 'axios';

import { dateToString, numberToHours } from '../../../helpers/validateTurn';

export default function TurnsDetails({
  unavailableTurns,
  selectedTurn,
  date,
  setDate,
}) {
  const dispatch = useDispatch();

  // const [date, setDate] = useState(new Date());

  function funcSetDate(date) {
    setDate(date);
    dispatch(getTurns());
  }

  const handleMedicAccepts = e => {
    e.preventDefault();
    //|*| Si acepta, debe enviar email al paciente.

    const { ID, time, MedicID } = JSON.parse(e.target.value);

    axios
      .put(`/turns/update/${ID}`, { time, MedicID, medicAccepts: true })
      .then(res => dispatch(getTurns()))
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: `Turn ID ${ID} accepted!`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, try again.',
        });
        console.error(err);
      });
  };

  const handleDelete = e => {
    e.preventDefault();
    //|*| Si cancela, debe enviar email al paciente.

    const { ID } = JSON.parse(e.target.value);

    /* //|> para evitar eliminar sin 24hs de antelación
    // Es para la parte de Paciente.
    const turnDate = new Date(`${date} ${numberToHours(time)}:00`);
    const yesterdayTurnDate = new Date(
      turnDate.setDate(turnDate.getDate() - 1)
    );

    console.log('turnDate => ', turnDate);
    console.log('yesterdayTurnDate => ', yesterdayTurnDate);

    if (yesterdayTurnDate < new Date())
      return Swal.fire({
        icon: 'error',
        title: 'You cannot cancel a shift without 24 hours notice.',
      }); */

    axios
      .delete(`/turns/delete/${ID}`)
      .then(res => dispatch(getTurns()))
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: `Turn ID ${ID} deleted!`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, try again.',
        });
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Turns details</h1>
      <p>Pick a date</p>
      <DatePicker value={date} onChange={funcSetDate} />
      {unavailableTurns.length &&
        unavailableTurns
          .filter(turn => turn.date === dateToString(date))
          .sort((a, b) => a.time - b.time)
          .map(turn => {
            return (
              <div key={turn.ID}>
                <p>-----------------------------------------</p>
                <h3>Turn ID {turn.ID}</h3>
                <p>
                  Patient accepts: {turn.patientAccepts ? '✔️' : 'Pending...'}
                </p>
                <p>
                  Your confirmation:{' '}
                  {turn.medicAccepts ? (
                    '✔️'
                  ) : (
                    <button
                      onClick={handleMedicAccepts}
                      value={JSON.stringify(turn)}
                    >
                      Accept?
                    </button>
                  )}
                </p>
                <p>Date: {turn.date}.</p>
                <p>Time: {numberToHours(turn.time)} hs.</p>
                <p>Duration: {turn.duration * 60} min.</p>
                <p>
                  Patient: {turn.userPatient.lastName}, {turn.userPatient.name}.
                </p>
                <p>Document: {turn.userPatient.document}</p>
                <p>Description: {turn.description}</p>
                <button onClick={handleDelete} value={JSON.stringify(turn)}>
                  ❌ CANCEL
                </button>
              </div>
            );
          })}
    </div>
  );
}
