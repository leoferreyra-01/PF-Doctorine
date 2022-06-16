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
      <button
        className={s.btn}
        onClick={() => navigate('/home/clinic-details/update-data')}
      >
        <span className={s.transition}></span>
        <span className={s.gradient}></span>
        <span className={s.label}>Update Clinic Data</span>
      </button>
      {filledClinic ? (
        <div className={s.details_container}>
          <p className={s.text}>
            Clinic Name <span>{clinic.name}</span>
          </p>
          <p className={s.location_text}>Location Details</p>
          <div className={s.location_container}>
            <p className={s.text}>
              Clinic Street <span>{clinic.street}</span>
            </p>
            <p className={s.text}>
              Clinic City <span>{clinic.city}</span>
            </p>
            <p className={s.text}>
              Clinic Street Number <span>{clinic.number}</span>
            </p>
          </div>
          <p className={s.contact_text}>Contact Details</p>
          <div className={s.contact_container}>
            <p className={s.text}>
              Clinic Telephone <span>{clinic.telephone}</span>
            </p>
            <p className={s.text}>
              Clinic Email <span>{clinic.email}</span>
            </p>
          </div>
        </div>
      ) : (
        <h3>Loading Clinic details...</h3>
      )}
    </div>
  );
}
