import React from 'react';
import s from './study.module.css';

export default function Study({ studyType, description, attach }) {
  function openTab() {
    window.open(attach);
  }
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
        padding: '1%',
      }}
    >
      <h2>
        <div>Study type:</div> {studyType}
      </h2>
      <h2>
        <p>Description:</p>
        {description === null ? 'Has no description' : description}
      </h2>
      <button onClick={openTab} className={s.btn2}>
        <span className={s.transition}></span>
        <span className={s.gradient}></span>
        <span role="img" aria-label="note">
          📋
        </span>
      </button>
    </div>
  );
}
