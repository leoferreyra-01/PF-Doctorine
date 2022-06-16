import React from 'react';
import { useSelector } from 'react-redux';
import BudgetPatients from './BudgetPatient';
import s from './Budget.module.css';
export default function BudgetPayments() {
  const budgets = useSelector(state => state.allBudgets);
  const filledBudgets = !!budgets.length;
  const newBudgets = budgets.filter(b => b.paid !== true);
  return (
    <div className={s.budget}>
      {filledBudgets ? (
        newBudgets.map(e => (
          <BudgetPatients
            key={e.treatments.ID}
            linkPayment={e.linkPayment}
            description={JSON.parse(e.treatments)[0].description}
            totalPrice={e.totalPrice}
          />
        ))
      ) : (
        <h3>This patient has no budgets</h3>
      )}
    </div>
  );
}
