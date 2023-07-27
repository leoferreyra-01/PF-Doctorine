import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInfoClinic,
  getTurns,
  postTurn,
  postBudget,
} from '../../../redux/actions';
// import { useNavigate } from 'react-router-dom';
//import toast from 'react-hot-toast';
import axios from 'axios';
import styles from './calendar.module.css';
import { parseISO } from 'date-fns';
import Swal from 'sweetalert2';

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
  const navigate = useNavigate();

  // Para obtener los turnos futuros del paciente.
  const [PatientTurns, setPatientTurns] = useState([]);
  const funcSetPatientTurns = ID =>
    axios.get(`/turns/search?ID=${ID}`).then(res => {
      const futureTurns = res.data
        .filter(turn => new Date(turn.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
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
  const { unavailableTurns } = useSelector(state => state);
  const [availableTurns, setAvailableTurns] = useState([]);
  const [date, setDate] = useState(dateToString(new Date()));
  const infoClinic = useSelector(state => state.infoClinics[0]);

  useEffect(() => {
    funcSetPatientID();
  }, [unavailableTurns]);

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getInfoClinic());

    const budgetconsulta = allBudgets.filter(p => p.totalPrice === 1170);
    console.log(budgetconsulta);

    if (budgetconsulta.length > 0) {
      console.log(unavailableTurns);
      for (let i = 0; i < budgetconsulta.length; i++) {
        if (budgetconsulta[i].paid === true) {
          const turn = unavailableTurns.find(
            o => o.PatientID === budgetconsulta[i].PatientID
          );
          console.log(turn);
          const { ID, MedicID, time } = turn;
          axios
            .put(`/turns/update/${ID}`, { time, MedicID, patientAccepts: true })
            .then(res => {
              funcSetPatientID();
              // Swal.fire({
              //   icon: 'success',
              //   title: 'Turn accepted!',
              //   showConfirmButton: false,
              //   timer: 1500,
              // });
            })
            .catch(err => console.error(err));
        }
      }
    }
  }, []);

  const handleChange = impDate => {
    if (
      PatientTurns.filter(turn => {
        if (turn.description) {
          return turn.description.toLocaleLowerCase().includes(CONSULTATION);
        }
        return false;
      }).length
    )
      return Swal.fire({
        icon: 'error',
        title: 'You already have a consultation turn!',
      });

    if (impDate > MIN_CONSULTATION_DATE) {
      setDate(dateToString(impDate));

      const officeHours = JSON.parse(infoClinic.officeHours);
      const turnStandardDuration = infoClinic.turnStandardDuration;

      setAvailableTurns(
        turnsAvailable(
          unavailableTurns,
          officeHours,
          turnStandardDuration,
          dateToString(impDate)
        )
      );
    } else
      Swal.fire({
        icon: 'error',
        title: 'Choose a date from tomorrow onwards.',
      });
  };

  const handleSelect = e => {
    e.preventDefault();

    try {
      const turn = JSON.parse(e.target.value);

      const infoTurn = {
        ...turn,
        description: CONSULTATION,
        // patientAccepts: true, // Lo sacamos para el pago.
        PatientID,
        MedicID: 1,
      };

      dispatch(postTurn({ ...infoTurn, email: userEmail }));

      setAvailableTurns([]);
      funcSetPatientID();

      //#region PAYMENT
      const budget = {
        PatientID: PatientID,
        treatments:
          '[{"ID":"0101","treatmentType":"consultas","description":"Examen - Diagnóstico - Fichado y Plan de Tratamiento.","price":1170,"quantity":1,"subTotalPrice":1170}]',
        discount: null,
        totalPrice: '1170',
      };

      dispatch(postBudget(budget));
      navigate('/home/payments');
      Swal.fire({
        icon: 'success',
        title: 'Consultation turn created!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, try again.',
      });
    }
  };
  const allBudgets = useSelector(state => state.allBudgets);

  const handleDelete = e => {
    // e.preventDefault(); No usar porque necesito que actualice el estado.
    //|*| Si cancela, debe enviar email al médico.

    const { ID, date, time, medicAccepts } = JSON.parse(e.target.value);

    // para evitar eliminar sin 24hs de antelación
    const turnDate = new Date(`${date} ${numberToHours(time)}:00`);
    const yesterdayTurnDate = new Date(
      turnDate.setDate(turnDate.getDate() - 1)
    );

    if (yesterdayTurnDate < new Date() && medicAccepts)
      return Swal.fire({
        icon: 'error',
        title:
          'If your doctor accepted the shift, you cannot cancel a shift without 24 hours notice.',
      });

    axios
      .delete(`/turns/delete/${ID}`)
      .then(res => {
        funcSetPatientID();
        Swal.fire({
          icon: 'success',
          title: 'Turn deleted!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, try again.',
        });
      });
  };

  const handlePatientAccepts = e => {
    // e.preventDefault(); No usar porque necesito que actualice el estado.
    //|*| Si acepta, debe enviar email al médico.

    const { ID, time, MedicID, description } = JSON.parse(e.target.value);
    // console.log('ID => ', ID);
    // console.log('time => ', time);

    //#region PAYMENT
    if (description && description.toLowerCase().includes(CONSULTATION))
      navigate('/home/payments');
    else
      return axios
        .put(`/turns/update/${ID}`, { time, MedicID, patientAccepts: true })
        .then(res => {
          funcSetPatientID();
          Swal.fire({
            icon: 'success',
            title: 'Turn accepted!',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(err => console.error(err));

    //#endregion
    console.log(allBudgets);
    const budgetconsulta = allBudgets.filter(p => p.totalPrice === 1170);
    console.log(budgetconsulta);
    if (budgetconsulta.length > 0) {
      if (budgetconsulta[0].paid === true) {
        axios
          .put(`/turns/update/${ID}`, { time, MedicID, patientAccepts: true })
          .then(res => {
            funcSetPatientID();
            Swal.fire({
              icon: 'success',
              title: 'Turn accepted!',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(err => console.error(err));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tituloChoose}>
        <h3>Choose a date from tomorrow onwards.</h3>
      </div>
      <div className={styles.containerDate}>
        <div className={styles.datepicker}>
          <DatePicker onChange={handleChange} value={parseISO(date)} />
        </div>
        <div className={styles.turnContainer}>
          {availableTurns.length ? (
            availableTurns.map((turn, idx) => (
              <div key={idx} className={styles.turns}>
                <p>Hour: {numberToHours(turn.time)} hs</p>
                <p>Duration: {turn.duration * 60} min.</p>
                <button
                  onClick={handleSelect}
                  value={JSON.stringify(turn)}
                  className={styles.btn}
                >
                  SELECT{' '}
                  <span role="img" aria-label="ok">
                    ✔️
                  </span>
                </button>
              </div>
            ))
          ) : (
            <h3>No available turns</h3>
          )}
        </div>
      </div>
      <div className={styles.uTurns}>
      <h2>Your turns:</h2>
      {PatientTurns.length &&
        PatientTurns.map(turn => (
          <div key={turn.ID}>
            <p>--------------------------------------------</p>
            <h3>Turn n° {turn.ID}</h3>
            <p>Medic accepts: {turn.medicAccepts ? '✔️' : 'Pending...'}</p>
            <p>
              Your confirmation:{' '}
              {turn.patientAccepts ? (
                '✔️'
              ) : (
                <button
                  onClick={handlePatientAccepts}
                  value={JSON.stringify(turn)}
                >
                  Accept?
                </button>
              )}
            </p>
            <p>Date: {turn.date}</p>
            <p>Time: {numberToHours(turn.time)} hs.</p>
            <p>Duration: {turn.duration * 60} min.</p>
            <p>Description: {turn.description}</p>
            <button onClick={handleDelete} value={JSON.stringify(turn)}>
              <span role="img" aria-label="X">
                ❌
              </span>{' '}
              CANCEL
            </button>
          </div>
        ))}
    </div>
    </div>
  );
}
