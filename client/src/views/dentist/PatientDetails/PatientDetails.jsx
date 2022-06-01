import React, { useEffect } from 'react';
import s from './PatientDetails.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getStudies,
  getEvolutions,
  getPatient,
  clear,
} from '../../../redux/actions';
import ClinicalHistory from '../clinic-history/get';
import SearchBar from '../SearchBar/SearchBar';
import Evolution from '../Evolution/Evolution';
import Study from '../Study/Study';
import Budget from '../budget';

export default function PatientDetails() {
  let { patientID } = useParams();
  const dispatch = useDispatch();
  const patient = useSelector(state => state.patient);
  const studies = useSelector(state => state.studies);
  const filledStudies = !!studies.length;
  const evolutions = useSelector(state => state.evolutions);
  const filledEvolutions = !!evolutions.length;

  useEffect(() => {
    if (!filledStudies) dispatch(getStudies(patientID));
    if (!filledEvolutions) dispatch(getEvolutions(patientID));
    if (Object.keys(patient).length === 0) dispatch(getPatient(patientID));

    return () => dispatch(clear());
  }, []);

  const detailsSearch = () => console.log('hola');
  return (
    <div className={s.dt_container}>
      <SearchBar
        placeholder="Buscar evoluciones o estudios.."
        onClick={detailsSearch}
      />

      {filledStudies ? (
        studies.map(p => (
          <Study
            key={p.ID}
            studyType={p.studyType}
            description={p.description}
          />
        ))
      ) : (
        <h3>Cargando los Estudios del paciente...</h3>
      )}
      {filledEvolutions ? (
        evolutions.map(p => (
          <Evolution
            key={p.ID}
            date={p.date}
            observations={p.observations}
            MedicID={p.MedicID}
          />
        ))
      ) : (
        <h3>Cargando la evolucion del paciente...</h3>
      )}
      <ClinicalHistory id={patientID} />
    </div>
  );
}
