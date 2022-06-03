import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBudgets,
  orderBudgetsByHigherPrice,
  orderBudgetsByLowerPrice,
  orderBudgetsByRecentDate,
  orderBudgetsByOlderDate,
  orderBudgetsByNameAsc,
  orderBudgetsByNameDes,
  filterPendingBudgets,
  filterCompletedBudgets,
} from '../../../redux/actions';
import Budget from '../budget';
import getPatientName from '../../../helpers/getPatientName';
import ListButtons from '../../../Components/ListButtons/ListButtons';
import s from './Budgets.module.css';

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
    <div className={s.container}>
      {filledBudgets ? (
        <div className={s.list}>
          <div className={s.name_container}>
            <div className={`${s.list_item} ${s.pname}`}>
              <h4>Patient Name</h4>
              <ListButtons
                up={orderBudgetsByNameAsc}
                down={orderBudgetsByNameDes}
              />
            </div>
            <div className={`${s.list_item} ${s.date}`}>
              <h4>Date</h4>
              <ListButtons
                up={orderBudgetsByRecentDate}
                down={orderBudgetsByOlderDate}
              />
            </div>
            <div className={`${s.list_item} ${s.amount}`}>
              <h4>Amount</h4>
              <ListButtons
                up={orderBudgetsByHigherPrice}
                down={orderBudgetsByLowerPrice}
              />
            </div>
            <div className={`${s.list_item} ${s.status}`}>
              <h4>Payment Status</h4>
              <ListButtons
                up={filterPendingBudgets}
                down={filterCompletedBudgets}
              />
            </div>
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
