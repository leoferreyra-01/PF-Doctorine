import React from 'react';
import s from './budget.module.css';

export default function Budget({
  totalPrice,
  creationDate,
  patientName,
  paid,
}) {
  return (
    <div className={s.budget}>
      <p className={s.pname}>{patientName}</p>
      <p className={s.date}>{creationDate}</p>
      <p className={s.amount}>{totalPrice}</p>
      <p className={s.status}>{paid ? 'Completed' : 'Pending'}</p>
    </div>
  );
}
