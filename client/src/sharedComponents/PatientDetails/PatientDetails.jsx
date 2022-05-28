import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getStudies,
  getEvolutions,
  getPatient,
  clear,
} from '../../redux/actions';
import SearchBar from '../../dentist/home/SearchBar/SearchBar';
import GridWrapper from '../GridWrapper/GridWrapper';
import Evolution from '../Evolution/Evolution';
import Study from '../Study/Study';

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
    <GridWrapper>
      <h3>Work in Progress</h3>
      <SearchBar
        placeholder="Buscar evoluciones o estudios.."
        searchBarWidth="720px"
        onClick={detailsSearch}
      />
      {filledStudies ? (
        studies.map(p => (
          <Study studyType={p.studyType} description={p.description} />
        ))
      ) : (
        <h3>Cargando los Estudios del paciente...</h3>
      )}
      {filledEvolutions ? (
        evolutions.map(p => (
          <Evolution
            date={p.date}
            observations={p.observations}
            MedicID={p.MedicID}
          />
        ))
      ) : (
        <h3>Cargando la evolucion del paciente...</h3>
      )}
    </GridWrapper>
  );
}
