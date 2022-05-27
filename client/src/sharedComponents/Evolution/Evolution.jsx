import React from 'react';

export default function Evolution({ date, observations, MedicID }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'black',
      }}
    >
      <h2>
        <div>Fecha:</div> {date}
      </h2>
      <h2>
        <div>Observaciones:</div> {observations}
      </h2>
      <h2>
        <div>Medico:</div> {MedicID}
      </h2>
    </div>
  );
}
