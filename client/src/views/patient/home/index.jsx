import React from 'react';
import PatientNavBar from '../navbar';
import Calendar from '../Calendar/Calendar';

export default function PatientHome() {
  return (
    <>
      <h3>Patient</h3>
      <PatientNavBar />
      <Calendar />
    </>
  );
}
