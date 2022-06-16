import React, { useEffect } from 'react';
import s from './UpdateBudget.module.css';
import { useParams, Link } from 'react-router-dom';
import {
  getAllBudgets,
  getAllPatients,
  updateBudget,
} from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Treatment from '../Treatment/Treatment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';

export default function UpdateBudget() {
  const { budgetID } = useParams();
  const dispatch = useDispatch();
  const allBudgets = useSelector(state => state.allBudgets);
  const filledBudgets = !!allBudgets.length;
  const patients = useSelector(state => state.allPatients);
  const filledPatients = !!patients.length;
  let budget = {};
  let patient = {};
  if (filledBudgets && filledPatients) {
    budget = allBudgets.find(b => b.ID === budgetID * 1);
    console.log(budget);
    patient = patients.find(p => p.Patient.ID === budget.PatientID);
  }

  useEffect(() => {
    if (!filledBudgets) dispatch(getAllBudgets());
    if (!filledPatients) dispatch(getAllPatients());
  }, []);

  const { totalPrice } = budget;
  const treatments = JSON.parse(budget.treatments);
  const handleClick = () => {
    const { linkPayment, ...restOfBudget } = budget;
    dispatch(updateBudget(restOfBudget));
  };

  return (
    <div className={s.container}>
      <div>
        <Link to="/home/budget" className={s.buton}>
          Back to budgets
        </Link>
      </div>
      <div className={s.summary_container}>
        <h3>Budget Summary</h3>
        {Object.keys(patient).length > 0 && (
          <div className={s.patient_details}>
            <p>
              Patient Name: <span>{patient.name}</span>
            </p>
            <p>
              Patient LastName: <span>{patient.lastName}</span>
            </p>
            <p>
              Patient Age: <span>{patient.age}</span>
            </p>
            <p>
              Patient Document: <span>{patient.document}</span>
            </p>
            <p>
              Patient Cellphone: <span>{patient.cellphone}</span>
            </p>
            <p>
              Patient Medical Service:
              <span> {patient.Patient.medicalService}</span>
            </p>
            <p>
              Creation Date:
              <span> {new Date(budget.creationDate).toLocaleString()}</span>
            </p>
            <p>
              Update Date:
              <span> {new Date(budget.updateDate).toLocaleString()}</span>
            </p>
          </div>
        )}
        <div className={s.list}>
          <div className={s.name_container}>
            <h4>Treatment ID</h4>
            <h4>Treatment</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Sub-Total</h4>
          </div>
          {treatments.length > 0 ? (
            treatments.map(t => (
              <Treatment
                key={t.ID}
                ID={t.ID}
                description={t.description}
                price={t.price}
                quantity={t.quantity}
                subTotalPrice={t.subTotalPrice}
              />
            ))
          ) : (
            <h3>No treatments added</h3>
          )}
        </div>
        <div className={s.totalPrice}>
          <h3>
            Total Price <span>{totalPrice}</span>
          </h3>
        </div>
        <div>
          Payment status
          <span>
            {budget.paid ? (
              'Completed'
            ) : (
              <div>
                Pending
                <button className={s.btn} onClick={handleClick}>
                  <span className={s.transition}></span>
                  <span className={s.gradient}></span>
                  <span className={s.label}>
                    <FontAwesomeIcon icon={faSquareCheck} size="2x" />
                  </span>
                </button>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
