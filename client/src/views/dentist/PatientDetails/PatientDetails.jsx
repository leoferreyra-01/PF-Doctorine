import React, { useEffect } from 'react';
import s from './PatientDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStudies, getEvolutions, getPatient } from '../../../redux/actions';
import ClinicalHistory from '../clinic-history/get';
import Evolution from '../Evolution/Evolution';
import Study from '../Study/Study';

export default function PatientDetails() {
  let { patientID } = useParams();
  const dispatch = useDispatch();

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
      dispatch(getStudies(patientID));
      dispatch(getEvolutions(patientID));
    }, 1000);
    // if (Object.keys(patient).length === 0) 
    dispatch(getPatient(patientID));
  }, []);

  return (
    <div className={s.dt_container}>
      <div className={s.links_container}>
        <Link to={`/home/addEvolution/${patientID}`} className={s.link_btn}>
          <button className={s.btn}>
            <span className={s.transition}></span>
            <span className={s.gradient}></span>
            <span className={s.label}> Add Evolution</span>
          </button>
        </Link>
        <Link to={`/home/studies/${patientID}`} className={s.link_btn}>
          <button className={s.btn}>
            <span className={s.transition}></span>
            <span className={s.gradient}></span>
            <span className={s.label}>Add Studies</span>
          </button>
        </Link>
        <Link to={`/home/updatePatient/${patientID}`} className={s.link_btn}>
          <button className={s.btn}>
            <span className={s.transition}></span>
            <span className={s.gradient}></span>
            <span className={s.label}>Update Patient Info</span>
          </button>
        </Link>
      </div>
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
