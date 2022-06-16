import React from 'react';
import { Link } from 'react-router-dom';
import s from './budget.module.css';

export default function Budget({
  totalPrice,
  creationDate,
  patientName,
  paid,
  budgetID,
}) {
  return (
    <div className={s.budget}>
      <p className={s.pname}>{patientName}</p>
      <p className={s.date}>{creationDate}</p>
      <p className={s.amount}>{totalPrice}</p>
      <p className={s.status}>{paid ? 'Completed' : 'Pending'}</p>
      <Link to={`/home/updateBudget/${budgetID}`}>
        <button className={s.btn}>
          <span className={s.transition}></span>
          <span className={s.gradient}></span>
          <span className={s.label}>Details</span>
        </button>
      </Link>
    </div>
  );
}
