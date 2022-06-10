import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getClinic } from '../../../redux/actions';
import s from './ClinicDetails.module.css';

export default function ClinicDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clinic = useSelector(state => state.clinic);
  const filledClinic = !!Object.keys(clinic).length;

  useEffect(() => {
    if (!filledClinic) dispatch(getClinic());
  }, []);
  return (
    <div className={s.container}>
      <h2>Clinic Details</h2>
      <Link to="/home/clinic-details/initial-config">Initial Config</Link>
      <button
        onClick={() => navigate('/home/clinic-details/update-data')}
        className={s.btn}
      >
        Update Clinic Data
      </button>

      {filledClinic ? (
        <div>
          <p className={s.text}>{clinic.name}</p>
          <p className={s.text}>{clinic.street}</p>
          <p className={s.text}>{clinic.city}</p>
          <p className={s.text}>{clinic.number}</p>
          <p className={s.text}>{clinic.telephone}</p>
          <p className={s.text}>{clinic.email}</p>
        </div>
      ) : (
        <h3>Loading Clinic details...</h3>
      )}
    </div>
  );
}
