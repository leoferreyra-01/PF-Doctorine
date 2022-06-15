import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './calendar.module.css';
import Swal from 'sweetalert2';

//|> REDUX ACTIONS
import {
  getInfoClinic,
  getTurns,
  postTurn,
  getAllPatients,
} from '../../../redux/actions';

//|> VALIDATIONS
import {
  validateTurn,
  dateToString,
  numberToHours,
  dateTimeToNumber,
  CONSULTATION,
} from '../../../helpers/validateTurn';
import bk_validate from '../../../helpers/backend_validators';

//|> CALENDAR
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import TurnDetails from '../calendarTurnsDetails';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DateTimePicker } from '@material-ui/pickers';
// import { alpha } from '@material-ui/core/styles';

// Calendar import configuration
import { parseISO, set } from 'date-fns';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

// Calendar configuration
const locales = {
  'en-US': enUS,
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
  const navigate = useNavigate();

  //#region unavailableTurns to Calendar ✔️
  const { unavailableTurns } = useSelector(state => state);
  // console.log('unavailableTurns => ', unavailableTurns);
  const [selectedTurn, setSelectedTurn] = useState(null);
  // console.log('selectedTurn => ', selectedTurn);
  const [date, setDate] = useState(new Date());
  // console.log('setDate => ', date);

  let events = [];
  if (unavailableTurns.length) {
    events = unavailableTurns.map(turn => {
      return {
        id: turn.ID,
        title: `${turn.userPatient.lastName}, ${turn.userPatient.name}`,
        start: new Date(`${turn.date}T${numberToHours(turn.time)}:00`),
        //'1995-12-17T03:24:00'
        end: new Date(
          `${turn.date}T${numberToHours(turn.time + turn.duration)}:00`
        ),
        infoTurn: turn,
      };
    });
  }
  // console.log('events => ', events);
  //#endregion

  //#region handleDateTime => setDate(impDate) | setTurnForm(true) ✔️
  const [turnForm, setTurnForm] = useState(false);
  // console.log('turnForm => ', turnForm);
  const infoClinic = useSelector(state => state.infoClinics[0]);

  const handleDateTime = impDate => {
    if (impDate < new Date()) {
      setTurnForm(false);
      return Swal.fire({
        icon: 'error',
        title: 'Choose a date from tomorrow onwards.',
      });
    }

    const officeHours = JSON.parse(infoClinic.officeHours);
    const turnStandardDuration = infoClinic.turnStandardDuration;

    const infoTurn = {
      date: dateToString(impDate),
      time: dateTimeToNumber(impDate),
      duration: turnStandardDuration,
    };

    if (!validateTurn(infoTurn, unavailableTurns, officeHours)) {
      setTurnForm(false);
      return Swal.fire({
        icon: 'error',
        title: 'Out of office hours or already taken.',
      });
    }

    setDate(impDate);
    setTurnForm(true);
    setSelectedTurn(null);
  };
  //#endregion

  //#region handleChange => infoTurn ✔️
  const [counterWarning, setCounterWarning] = useState(true);
  const [data, setData] = useState({
    duration: '',
    description: '',
    medicAccepts: true,
    patientAccepts: false,
    MedicID: 1,
    PatientID: 0,
  });

  function handleChange(e) {
    e.preventDefault();

    if (counterWarning && e.target.name === 'description') {
      if (e.target.value.toLocaleLowerCase().includes(CONSULTATION)) {
        setCounterWarning(false);
        Swal.fire({
          icon: 'warning',
          title: `"${CONSULTATION}" is a word reserved for consultations. If your patient have a turn with "...${CONSULTATION}..." in the description, he cant be able to create a new consultation turn.`,
        });
      }
    }

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const infoTurn = {
    date: dateToString(date),
    time: dateTimeToNumber(date),
    ...data,
    duration: parseInt(data.duration) / 60,
  };
  // console.log('handleChange/infoTurn => ', infoTurn);
  //#endregion

  //#region Backend Validation with handleChange ✔️
  const [validations, setValidations] = useState([false, null]);

  async function bk_validateTurn() {
    // console.log('bk_validateTurn/infoTurn => ', infoTurn);

    const [fail, err] = await bk_validate.Turn(infoTurn);

    if (fail) {
      setValidations([true, err]);
    } else {
      setValidations([false, null]);
    }
  }
  let [fail, err] = validations;
  // console.log('validations => ', validations);
  //#endregion

  //#region handleSelectPatient => setPatientSelected(patient) ✔️
  const { allPatients } = useSelector(state => state);
  const [patientSelected, setPatientSelected] = useState(null);

  function preventSubmit(e) {
    e.preventDefault();
    if (data.PatientID === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Select a patient.',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Patient selected successfully.',
      });
    }
  }

  function handleSelectPatient(e) {
    e.preventDefault();
    const patient = allPatients.find(patient => {
      const targetValue = e.target.value;
      const patientData = `${patient.name} ${patient.lastName} ${patient.document} ${patient.email}`;

      return patientData
        .toLocaleLowerCase()
        .includes(targetValue.toLocaleLowerCase());
    });
    // console.log('handleSelectPatient/patient => ', patient);

    if (e.target.value === '') {
      setPatientSelected(null);
      return setData({ ...data, PatientID: 0 });
    }

    if (patient) {
      setPatientSelected(patient);
      setData({ ...data, PatientID: patient.Patient.ID });
    } else {
      setPatientSelected(null);
      setData({ ...data, PatientID: 0 });
    }
  }
  //#endregion

  //#region handleSubmit => postTurn ✔️

  const handleSubmit = e => {
    e.preventDefault();
    // console.log('infoTurn => ', infoTurn);

    try {
      if (fail) {
        Swal.fire({
          icon: 'error',
          title: 'Your form has errors, please check it out.',
        });
      } else {
        if (!patientSelected)
          return Swal.fire({
            icon: 'error',
            title: 'Please select a patient.',
          });

        dispatch(postTurn({ ...infoTurn, email: patientSelected.email }));
        setTurnForm(false);
        setPatientSelected(null);
        setData({
          duration: '',
          description: '',
          medicAccepts: true,
          patientAccepts: false,
          MedicID: 1,
          PatientID: 0,
        });
        setSelectedTurn({
          ...infoTurn,
          userPatient: patientSelected,
        });

        Swal.fire({
          icon: 'success',
          title: 'Turn successfully created.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, please try again.',
      });
    }
  };
  //#endregion

  //#region Calendar interactions ✔️
  function selectDay(day = new Date()) {
    setDate(day);
    setSelectedTurn(null);
  }

  function selectTurn(turn = { infoTurn: null }) {
    setSelectedTurn(turn.infoTurn);
  }
  //#endregion

  // Constant updates
  function loop() {
    setTimeout(function () {
      dispatch(getTurns());

      loop();
    }, 10000); // every 10 seconds.
  }

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getInfoClinic());
    dispatch(getAllPatients());
    loop();
  }, []);

  useEffect(() => {
    bk_validateTurn();
  }, [data]);

  return (
    <div className={s.container}>
      |-------------------------CALENDAR---------------------------|
      <Calendar
        onDrillDown={selectDay}
        onSelectEvent={selectTurn}
        date={date}
        localizer={localizer}
        style={{ height: 500, margin: '50px' }}
        events={events}
      />
      |--------------------------CREATE--------------------------|
      <div>
        <h1>Create a Turn</h1>
        <br />
        <div>
          <h3>Select a Patient</h3>
          <form onSubmit={preventSubmit}>
            <label>Patient: </label>
            <input
              placeholder="Fullname, document or email"
              type="text"
              name="patient"
              onChange={handleSelectPatient}
            />
            {patientSelected ? (
              <div>
                <p>{`SELECTED: ${patientSelected.lastName}, ${patientSelected.name} ✔️`}</p>
                <p>{`Document: ${patientSelected.document} ✔️`}</p>
                <p>{`Email: ${patientSelected.email} ✔️`}</p>
              </div>
            ) : (
              <h4>No patient selected ❌</h4>
            )}
          </form>
        </div>

        <br />

        <h3>Select day and time</h3>
        <div>
          <DateTimePicker
            onChange={handleDateTime}
            value={parseISO(dateToString(date))}
          />
        </div>

        <br />

        {turnForm && (
          <form onSubmit={handleSubmit}>
            <label>Duration: </label>
            <input
              value={data.duration}
              placeholder="minutes"
              type="number"
              name="duration"
              onChange={handleChange}
            />
            {fail && err.duration ? <p>{err.duration.msg}</p> : '✔️'}

            <label>Description: </label>
            <input
              value={data.description}
              placeholder={`Example: ${CONSULTATION}`}
              type="text"
              name="description"
              onChange={handleChange}
            />
            {fail && err.description ? <p>{err.description.msg}</p> : '✔️'}

            <button type="submit">📝CREATE</button>
          </form>
        )}
      </div>
      |--------------------------DETAILS----------------------------|
      <TurnDetails
        unavailableTurns={unavailableTurns}
        selectedTurn={selectedTurn}
        setSelectedTurn={setSelectedTurn}
        date={date}
        setDate={setDate}
      />
    </div>
  );
}
