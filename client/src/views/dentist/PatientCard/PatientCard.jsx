import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './PatientCard.module.css';

export default function PatientCard({ ID, name, lastName, imageProfile }) {
  return (
    <div>
      <NavLink
        to={`/home/${ID}`}
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
          <h3 className={`${s.title} ${s.title_dni}`}>
            Adress: china ID: 45468523
          </h3>
        </div>
        <div className={s.cardactions}>
          <button className={s.btn}>Go to clinic history</button>
          <button className={s.btn}>Go to studies</button>
        </div>
      </NavLink>
    </div>
  );
}
