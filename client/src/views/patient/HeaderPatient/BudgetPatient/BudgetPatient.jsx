import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Budgetspatients() {
  const budgets = useSelector(state => state.allBudgets);
  function openTab() {
    window.open(budgets[1].linkPayment);
  }
  console.log(budgets);
  return (
    <div>
      {budgets.map(e => {
        return (
          <div>
            <h4>Total Price:{e.totalPrice}</h4>
            <button onClick={openTab}>PAY</button>
          </div>
        );
      })}
    </div>
  );
}