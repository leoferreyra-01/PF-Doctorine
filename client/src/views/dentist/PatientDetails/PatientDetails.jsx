import React, { useEffect } from 'react';
import s from './PatientDetails.module.css';
import { Link, useParams } from 'react-router-dom';
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

export default function PatientDetails() {
  let { patientID } = useParams();
  const dispatch = useDispatch();
  const patient = useSelector(state => state.patient);
  console.log('DETAILS/patient => ', patient);
  const studies = useSelector(state => state.studies);
  const filledStudies = !!studies.length;
  const evolutions = useSelector(state => state.evolutions);
  const filledEvolutions = !!evolutions.length;

  useEffect(() => {
    setTimeout(() => {
      if (!filledStudies) dispatch(getStudies(patientID));
      if (!filledEvolutions) dispatch(getEvolutions(patientID));
    }, 1000);
    if (Object.keys(patient).length === 0) dispatch(getPatient(patientID));
    // return () => dispatch(clear());
  }, []);

  const detailsSearch = () => console.log('hola');
  return (
    <div className={s.dt_container}>
      <SearchBar
        placeholder="Search studies or evolutions"
        onClick={detailsSearch}
      />
      <Link to={`/home/addEvolution/${patientID}`}>
        <button className={s.btn}>Add Evolution</button>
      </Link>
      <Link to={`/home/studies/${patientID}`}>
        <button className={s.btn}>Add Studies</button>
      </Link>
      <Link to={`/home/updatePatient/${patientID}`}>
        <button className={s.btn}>Update Patient Info</button>
      </Link>
      {filledStudies ? (
        studies.map(p => (
          <Study
            key={p.ID}
            studyType={p.studyType}
            description={p.description}
            attach={p.attach === null ? 'No content file' : p.attach}
          />
        ))
      ) : (
        <h3>Charging patient studies...</h3>
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
        <h3>Charging patient evolution...</h3>
      )}
      <ClinicalHistory id={patientID} />
    </div>
  );
}
