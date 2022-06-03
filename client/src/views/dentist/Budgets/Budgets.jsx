import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBudgets } from '../../../redux/actions';
import Budget from '../budget';
import getPatientName from '../../../helpers/getPatientName';

function formatDate(date) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return `${month}/${day}/${year}`;
}

export default function Budgets() {
  const dispatch = useDispatch();
  const allPatients = useSelector(state => state.allPatients);
  const budgetsToShow = useSelector(state => state.budgetsToShow);
  const filledBudgets = !!budgetsToShow.length;

  useEffect(() => {
    if (!filledBudgets) dispatch(getAllBudgets());
  }, []);

  return (
    <div>
      {filledBudgets ? (
        <div>
          <div>
            <h4>Patient Name</h4>
            <h4>Date</h4>
            <h4>Amount</h4>
            <h4>Payment Status</h4>
          </div>
          {budgetsToShow.map(budget => (
            <Budget
              key={budget.ID}
              totalPrice={budget.totalPrice}
              creationDate={formatDate(budget.creationDate)}
              patientName={getPatientName(budget.PatientID, allPatients)}
              paid={budget.paid}
            />
          ))}
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
