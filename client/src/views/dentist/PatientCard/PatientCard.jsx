import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './PatientCard.module.css';

export default function PatientCard({ ID, name, lastName, document }) {
  return (
    <div>
      <div
        style={{ textDecoration: 'none', width: '100%' }}
        className={s.container}
      >
        <div className={s.title_container}>
          <h3 className={s.title}>
            {name.charAt(0).toUpperCase() +
              name.slice(1) +
              ' ' +
              lastName.charAt(0).toUpperCase() +
              lastName.slice(1)}
          </h3>
          <h3 className={`${s.title} ${s.title_dni}`}>DNI: {document}</h3>
        </div>
        <NavLink to={`/home/${ID}`} className={s.link}>
          <div className={s.cardactions}>
            <button className={s.btn}>
              See Clinical History{' '}
              <span role="img" aria-label="HC">
                📁
              </span>
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
