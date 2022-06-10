import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoClinic, getTurns, postTurn } from '../../../redux/actions';
import { parseISO } from 'date-fns';
import Swal from 'sweetalert2';
import {
  turnsAvailable,
  dateToString,
  numberToHours,
  CONSULTATION,
  MIN_CONSULTATION_DATE,
} from '../../../helpers/validateTurn';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Appointments() {
  const dispatch = useDispatch();
  const { unavailableTurns } = useSelector(state => state);
  console.log('unavailableTurns', unavailableTurns);
  const [availableTurns, setAvailableTurns] = useState([]);
  const [date, setDate] = useState(dateToString(new Date()));
  const infoClinic = useSelector(state => state.infoClinics[0]);
  const turns = useSelector(state => state.unavailableTurns);

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getInfoClinic());
  }, []);

  let events;
  if (unavailableTurns.length) {
    events = unavailableTurns.map(patient => {
      return {
        id: patient.userPatient.ID,
        title: `${patient.userPatient.lastName}, ${patient.userPatient.name}`,
        start: new Date(`${patient.date}T${numberToHours(patient.time)}:00`), //'1995-12-17T03:24:00'
        end: new Date(
          `${patient.date} ${numberToHours(patient.time + patient.duration)}`
        ),
      };
    });
  }
  console.log('events', events);

  const handleChange = impDate => {
    console.log('impDate => ', impDate);

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
    } else
      Swal.fire({
        icon: 'error',
        title: 'Choose a date from tomorrow onwards.',
      });
  };

  const handleSelect = e => {
    e.preventDefault();

    //   try {
    //     const turn = JSON.parse(e.target.value);

    //     const infoTurn = {
    //       ...turn,
    //       description: CONSULTATION,
    //       patientAccepts: true,
    //       PatientID,
    //       MedicID: 1,
    //     };

    //     dispatch(postTurn(infoTurn));

    //     setAvailableTurns([]);
    //     funcSetPatientID();
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Consultation turn created!',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Something went wrong, try again.',
    //     });
    //   }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        style={{ height: 500, margin: '50px' }}
        events={events}
      />

      <h3>Schedule a new shift</h3>
      <div>
        <DatePicker onChange={handleChange} value={parseISO(date)} />
      </div>

      <div>
        {availableTurns.length ? (
          availableTurns.map((turn, idx) => (
            <div key={idx}>
              <button onClick={handleSelect} value={JSON.stringify(turn)}>
                ✔️ SELECT
              </button>
              <p>Time: {numberToHours(turn.time)} hs</p>
              <p>Duration: {turn.duration * 60} min.</p>
            </div>
          ))
        ) : (
          <h3>No available turns or no date selected</h3>
        )}
      </div>
    </div>
  );
}
