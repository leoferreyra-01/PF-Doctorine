import React from 'react';
import s from './ClinicDetails.module.css';
import InitialConfig from './InitialConfig/InitialConfig';

export default function ClinicDetails() {
  return (
    <div className={s.container}>
      <h2>Clinic Details</h2>
      <InitialConfig />
    </div>
  );
}
