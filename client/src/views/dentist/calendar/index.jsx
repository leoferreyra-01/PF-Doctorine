// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
// const localizer = momentLocalizer(moment) // or globalizeLocalizer
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, getTurns, getAllPatients } from "../../../redux/actions";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// const appointment = [
//   {}
// ]

export default function Appointments() {
  const dispatch = useDispatch();
  const { unavailableTurns } = useSelector((state) => state);
  const { allPatients } = useSelector(state => state)
  console.log('unavailableTurns', unavailableTurns);
  console.log('allPatientes', allPatients)

  const patientsID = unavailableTurns.map(turn => turn.PatientID);
    console.log('patientsID', patientsID)
    

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getAllPatients())
  }, []);

  // let eventFormatter = () =>{
  //   const patientsID = unavailableTurns.map(turn => turn.PatientID);
  //   console.log(patientsID)
  // };

  return (
    <Calendar
      localizer={localizer}
      style={{ height: 500, margin: "50px" }}
      // event={turns}
    />
  );
}
//HACER FUNCION QUE TRANSFORME UNAVAILABLETURN EN EVENT
// consolelog de unavailableTurn:
  //  ID: 2
  // Medic:
  // ClinicID: 1
  // ID: 1
  // UserID: 1
  // specialization: "Odontologo"
  // title: "Medico"
  // tuition_date: "2022-05-22"
  // tuition_number: 33354
  // [[Prototype]]: Object
  // MedicID: 1
  // Patient:
  // ID: 6
  // UserID: 7
  // medicalService: "Sancor Salud - Plan: 6"
  // showClinicalHistory: true
  // tutor: null
  // [[Prototype]]: Object
  // PatientID: 6
  // date: "2022-05-30"
  // description: "Iteration n° 6"
  // duration: 1.5
  // medicAccepts: null
  // patientAccepts: null
  // time: 10

  //formato de events:
  // {
  //   title: "event 6",
  //   start: "2019-12-05",
  //   end: "2019-12-07",
  //   allDay: true
  // }
