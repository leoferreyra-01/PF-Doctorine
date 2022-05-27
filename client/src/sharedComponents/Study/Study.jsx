import React from 'react';

export default function Study({ studyType, description }) {
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
        <div>Tipo de estudio:</div> {studyType}
      </h2>
      <h2>
        <div>Descripcion:</div>
        {description === null ? 'No tiene descripcion' : description}
      </h2>
    </div>
  );
}
