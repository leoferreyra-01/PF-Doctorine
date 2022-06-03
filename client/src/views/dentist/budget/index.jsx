import React from 'react';

export default function Landing({
  totalPrice,
  creationDate,
  patientName,
  paid,
}) {
  return (
    <div>
      <h3>{patientName}</h3>
      <h3>{creationDate}</h3>
      <h3>{totalPrice}</h3>
      <h3>{paid ? 'Completed' : 'Pending'}</h3>
    </div>
  );
}
