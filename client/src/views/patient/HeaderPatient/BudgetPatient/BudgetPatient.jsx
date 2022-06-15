import React from 'react';
import logopago from '../../../../../src/Pictures/horizontal_logo.png';
import s from './Budget.module.css';
export default function BudgetPatients({
  description,
  linkPayment,
  totalPrice,
}) {
  // function openTab() {
  //   window.open(linkPayment);
  // }
  return (
    <div>
      <img src={logopago} alt="logo" width="100px" />
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
          <div>Total Price:</div> ${totalPrice}
        </h2>
        <h2>
          <div>Description:</div>
          {description === null ? 'Has no description' : description}
          <a href={linkPayment} target="_self" rel="noopener noreferrer">
            <button className={s.button}>PAY</button>
          </a>
        </h2>
      </div>
    </div>
  );
}
