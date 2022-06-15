import React from 'react';

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
      }}
    >
      <h2>
        <div>Study type:</div> {studyType}
      </h2>
      <h2>
        <div>Description:</div>
        {description === null ? 'Has no description' : description}
        <button onClick={openTab}>
          <span role="img" aria-label="note">
            📋
          </span>
        </button>
      </h2>
    </div>
  );
}
