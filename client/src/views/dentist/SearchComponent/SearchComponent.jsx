import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './SearchComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { clear, getAllPatients, getPatientDni } from '../../../redux/actions';
import PatientCard from '../PatientCard/PatientCard';
import SearchBar from '../SearchBar/SearchBar';
export default function SearchComponent() {
  const searchedPatient = useSelector(state => state.searchedPatient);
  const allPatients = useSelector(state => state.allPatients);
  const filledPatients = !!allPatients.length;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!filledPatients) dispatch(getAllPatients());
    return () => dispatch(clear());
  }, []);

  if (searchedPatient === 'Patient Not Found') {
    return (
      <div className={`${s.sc_container}`}>
        <SearchBar placeholder="Search patient" onClick={getPatientDni} />
        <div className={s.sc_container_error}>
          <div>
            <FontAwesomeIcon icon={faCircleExclamation} size="2x" />
          </div>
          <div>
            <h4>Error</h4>
            <h4>Patient not found — !</h4>
          </div>
          <Link to="./register">
            <button className={s.buton}>Create patient?</button>
          </Link>
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
    <div className={s.sc_container}>
      <SearchBar placeholder="Search patient" onClick={getPatientDni} />

      {searchedPatient.length
        ? searchedPatient.map(patient => (
            <PatientCard
              key={patient.Patient.ID}
              ID={patient.Patient.ID}
              name={patient.name}
              lastName={patient.lastName}
              imageProfile={patient.imageProfile}
            />
          ))
        : allPatients.map(patient => (
            <PatientCard
              key={patient.Patient.ID}
              ID={patient.Patient.ID}
              name={patient.name}
              lastName={patient.lastName}
              imageProfile={patient.imageProfile}
            />
          ))}
    </div>
  );
}
