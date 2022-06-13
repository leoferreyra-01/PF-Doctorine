import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPatientDni2,
  getEvolutions,
  getStudies,
} from '../../../redux/actions';
import s from './EvolutionsNStudies.module.css';

export default function EvolutionsNStudies() {
  const dispatch = useDispatch();
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const evolutions = useSelector(state => state.evolutions);
  const studies = useSelector(state => state.studies);
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));

  useEffect(() => {
    if (!SearchedPatient.medicalService) {
      dispatch(getPatientDni2(uno.document));
    }
    dispatch(getEvolutions(SearchedPatient.Patient.ID));
    dispatch(getStudies(SearchedPatient.Patient.ID));
  }, [dispatch]);

  return (
    <div className={s.container}>
      <div className={s.containerEv}>
        {evolutions ? (
          evolutions.map(evolution => (
            <div className={s.evolutions}>
              <h3>{evolution.date ? evolution.date : 'Unknown'}</h3>
              <h3>{evolution.MedicID ? evolution.MedicID : 'Unknown'}</h3>
              <h3>
                {evolution.TreatmentID ? evolution.TreatmentID : 'Unknown'}
              </h3>
            </div>
          ))
        ) : (
          <h3>Loading Evolutions...</h3>
        )}
      </div>
      <hr />
      <div className={s.containerSt}>
        {studies ? (
          studies.map(studies => (
            <div className={s.studies}>
              <h3>{studies.studyType ? studies.studyType : 'Unknown'}</h3>
              <h3>{studies.description ? studies.description : 'Unknown'}</h3>
              <h3>{studies.attach ? studies.attach : 'Unknown'}</h3>
            </div>
          ))
        ) : (
          <h3>Loading Studies...</h3>
        )}
      </div>
    </div>
  );
}
