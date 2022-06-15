import React, { useEffect } from 'react';
import s from './PatientDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStudies, getEvolutions, getPatient } from '../../../redux/actions';
import ClinicalHistory from '../clinic-history/get';
import SearchBar from '../SearchBar/SearchBar';
import Evolution from '../Evolution/Evolution';
import Study from '../Study/Study';

export default function PatientDetails() {
  let { patientID } = useParams();
  const dispatch = useDispatch();

  const patient = useSelector(state => state.patient);
  // console.log('patient', patient);
  const studies = useSelector(state => state.studies);
  const filledStudies = !!studies.length;
  // console.log('studies', studies);
  // console.log('filledstudies', filledStudies);

  const evolutions = useSelector(state => state.evolutions);
  const filledEvolutions = !!evolutions.length;
  // console.log('evolutions', evolutions);
  // console.log('filledevolutions', filledEvolutions);

  useEffect(() => {
    setTimeout(() => {
      if (!filledStudies) dispatch(getStudies(patientID));
      if (!filledEvolutions) dispatch(getEvolutions(patientID));
    }, 1000);
    if (Object.keys(patient).length === 0) dispatch(getPatient(patientID));
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
        studies.map((p, i) => (
          <div key={`studie${i}`}>
            <Study
              key={p.ID}
              studyType={p.studyType}
              description={p.description}
              attach={p.attach === null ? 'No content file' : p.attach}
            />
          </div>
        ))
      ) : (
        <h3>Charging patient studies...</h3>
      )}
      {filledEvolutions ? (
        evolutions.map((p, i) => (
          <div key={`evolution${i}`}>
            <Evolution
              key={p.ID}
              date={p.date}
              observations={p.observations}
              MedicID={p.MedicID}
            />
          </div>
        ))
      ) : (
        <h3>Charging patient evolution...</h3>
      )}
      <ClinicalHistory id={patientID} />
    </div>
  );
}
