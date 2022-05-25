import React from 'react';
import PatientNavBar from '../navbar';
import Calendar from '../../common/calendar/Calendar';

export default function PatientHome() {
  return (
    <>
      <h3>Patient</h3>
      <PatientNavBar />
      <Calendar />
    </>
  );
}
