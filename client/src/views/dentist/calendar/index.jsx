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
  postBudget,
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
import { parseISO } from 'date-fns';
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

  //#region unavailableTurns to Calendar ✔️
  const { unavailableTurns } = useSelector(state => state);
  const [selectedTurn, setSelectedTurn] = useState(null);
  const [date, setDate] = useState(new Date());

  let events = [];
  if (unavailableTurns.length) {
    events = unavailableTurns.map(turn => {
      return {
        id: turn.ID,
        title: `${turn.userPatient.lastName}, ${turn.userPatient.name}`,
        start: new Date(`${turn.date}T${numberToHours(turn.time)}:00`),
        end: new Date(
          `${turn.date}T${numberToHours(turn.time + turn.duration)}:00`
        ),
        infoTurn: turn,
      };
    });
  }
  //#endregion

  //#region handleDateTime => setDate(impDate) | setTurnForm(true) ✔️
  const [turnForm, setTurnForm] = useState(false);
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
          title: `"${CONSULTATION}" is a word reserved for consultations. If your patient have a turn with "...${CONSULTATION}..." in the description, he cant be able to create a new consultation turn. And a new budget will be automatically created.`,
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
  //#endregion

  //#region Backend Validation with handleChange ✔️
  const [validations, setValidations] = useState([false, null]);

  async function bk_validateTurn() {
    const [fail, err] = await bk_validate.Turn(infoTurn);

    if (fail) {
      setValidations([true, err]);
    } else {
      setValidations([false, null]);
    }
  }
  let [fail, err] = validations;
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
    console.log('infoTurn => ', infoTurn);

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
        //#region PAYMENT

        if (infoTurn.description.toLowerCase().includes(CONSULTATION)) {
          const budget = {
            PatientID: data.PatientID,
            treatments:
              '[{"ID":"0101","treatmentType":"consultas","description":"Examen - Diagnóstico - Fichado y Plan de Tratamiento.","price":1170,"quantity":1,"subTotalPrice":1170}]',
            discount: null,
            totalPrice: '1170',
          };

          dispatch(postBudget(budget));
        }

        //#endregion

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

  //#region  constant update
  function selectedTurnControl() {
    let find = null;

    if (selectedTurn) {
      find = unavailableTurns.find(turn => turn.ID === selectedTurn.ID);

      if (!find) setSelectedTurn(null);
    }
  }
  useEffect(() => {
    selectedTurnControl();
  }, [unavailableTurns]);
  //#region

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getInfoClinic());
    dispatch(getAllPatients());
  }, []);

  useEffect(() => {
    bk_validateTurn();
  }, [data]);

  return (
    <div className={s.container}>
      <Calendar
        onDrillDown={selectDay}
        onSelectEvent={selectTurn}
        date={date}
        localizer={localizer}
        style={{ height: 500, margin: '50px', fontSize: '1.4rem' }}
        events={events}
      />
      <h2 className={s.create_title}>Create a Turn</h2>
      <div className={s.create_container}>
        <div className={s.select_p}>
          <form onSubmit={preventSubmit} className={s.select_form}>
            <h3>Select a Patient</h3>
            <div className={s.input_container}>
              <div className={s.form_group_field}>
                <input
                  className={s.form__field}
                  placeholder="Fullname, document or email"
                  type="text"
                  name="patient"
                  onChange={handleSelectPatient}
                />
                <label className={s.form__label} for="patient">
                  Fullname, document or email
                </label>
              </div>
            </div>
          </form>
          {patientSelected ? (
            <div className={`${s.select_patient} ${s.p_details}`}>
              <p>{`SELECTED: ${patientSelected.lastName}, ${patientSelected.name} ✔️`}</p>
              <p>{`Document: ${patientSelected.document} ✔️`}</p>
              <p>{`Email: ${patientSelected.email} ✔️`}</p>
            </div>
          ) : (
            <h4 className={s.p_details}>
              No patient selected
              <span role="img" aria-label="X">
                ❌
              </span>
            </h4>
          )}
        </div>

        <div className={s.timePicker}>
          <h3>Select day and time</h3>
          <DateTimePicker
            onChange={handleDateTime}
            style={{ width: '80%', fontSize: '1.4rem' }}
            value={parseISO(dateToString(date))}
          />
        </div>

        {turnForm && (
          <form onSubmit={handleSubmit}>
            <div className={s.input_container}>
              <div className={s.form_group_field}>
                <input
                  className={s.form__field}
                  value={data.duration}
                  placeholder="Minutes Duration"
                  type="number"
                  name="duration"
                  onChange={handleChange}
                />
                <label className={s.form__label} for="number">
                  Duration
                </label>
              </div>
            </div>
            {/* <label>Duration: </label>
            <input
              value={data.duration}
              placeholder="minutes"
              type="number"
              name="duration"
              onChange={handleChange}
            /> */}
            {fail && err.duration ? <p>{err.duration.msg}</p> : '✔️'}

            {/* <label>Description: </label>
            <input
              value={data.description}
              placeholder={`Example: ${CONSULTATION}`}
              type="text"
              name="description"
              onChange={handleChange}
            /> */}
            <div className={s.input_container}>
              <div className={s.form_group_field}>
                <input
                  className={s.form__field}
                  value={data.description}
                  placeholder={`Example: ${CONSULTATION}`}
                  type="text"
                  name="description"
                  onChange={handleChange}
                />
                <label className={s.form__label} for="description">
                  Description
                </label>
              </div>
            </div>
            {fail && err.description ? <p>{err.description.msg}</p> : '✔️'}

            <button className={s.btn} type="submit">
              <span className={s.transition}></span>
              <span className={s.gradient}></span>
              <span className={s.label}>
                Create
                <span role="img" aria-label="agend">
                  📝
                </span>
              </span>
            </button>
          </form>
        )}
      </div>

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
