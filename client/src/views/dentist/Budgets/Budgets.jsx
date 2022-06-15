import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBudgets,
  getBudgetsDni,
  getBudgetsName,
  orderBudgetsByHigherPrice,
  orderBudgetsByLowerPrice,
  orderBudgetsByRecentDate,
  orderBudgetsByOlderDate,
  orderBudgetsByNameAsc,
  orderBudgetsByNameDes,
  filterPendingBudgets,
  filterCompletedBudgets,
  clear,
} from '../../../redux/actions';
import Budget from '../budget';
import ListButtons from '../../../Components/ListButtons/ListButtons';
import s from './Budgets.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

function formatDate(date) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return `${month}/${day}/${year}`;
}

export default function Budgets() {
  const dispatch = useDispatch();
  const budgetsToShow = useSelector(state => state.budgetsToShow);
  const filledBudgets = !!budgetsToShow.length;

  useEffect(() => {
    dispatch(getAllBudgets());
  }, []);

  if (budgetsToShow === 'Budget Not Found') {
    return (
      <div className={s.container}>
        <SearchBar
          placeholder="Search budgets with the patient name or DNI"
          handleDni={getBudgetsDni}
          handleName={getBudgetsName}
        />
        <div className={s.b_container_error}>
          <div>
            <FontAwesomeIcon icon={faCircleExclamation} size="2x" />
          </div>
          <div>
            <h4>Error</h4>
            <h4>Budget not Found — !</h4>
          </div>
          <div>
            <button className={s.x_icon} onClick={() => dispatch(clear())}>
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <SearchBar
        placeholder="Search budgets with the patient name or DNI"
        handleDni={getBudgetsDni}
        handleName={getBudgetsName}
      />
      {filledBudgets ? (
        <div className={s.list}>
          <div className={s.name_container}>
            <div className={`${s.list_item}`}>
              <h4>Patient Name</h4>
              <ListButtons
                up={orderBudgetsByNameAsc}
                down={orderBudgetsByNameDes}
              />
            </div>
            <div className={`${s.list_item}`}>
              <h4>Date</h4>
              <ListButtons
                up={orderBudgetsByRecentDate}
                down={orderBudgetsByOlderDate}
              />
            </div>
            <div className={`${s.list_item}`}>
              <h4>Amount</h4>
              <ListButtons
                up={orderBudgetsByHigherPrice}
                down={orderBudgetsByLowerPrice}
              />
            </div>
            <div className={`${s.list_item}`}>
              <h4>Payment Status</h4>
              <ListButtons
                up={filterPendingBudgets}
                down={filterCompletedBudgets}
              />
            </div>
            <div className={`${s.list_item}`}>
              <h4>Payment Details</h4>
            </div>
          </div>
          {budgetsToShow.map(budget => (
            <Budget
              key={budget.ID}
              budgetID={budget.ID}
              totalPrice={budget.totalPrice}
              creationDate={formatDate(budget.creationDate)}
              patientName={budget.patientFullName}
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
