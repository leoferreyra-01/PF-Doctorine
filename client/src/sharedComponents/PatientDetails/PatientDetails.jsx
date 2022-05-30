import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getStudies,
  getEvolutions,
  getPatient,
  clear,
} from '../../redux/actions';
import ClinicalHistory from '../../dentist/home/navbar/detail/clinic-history/get';
import SearchBar from '../../dentist/home/SearchBar/SearchBar';
import GridWrapper from '../GridWrapper/GridWrapper';
import Box from '@mui/material/Box';
import Evolution from '../Evolution/Evolution';
import Study from '../Study/Study';
const cardHeaderStyles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '20px',
    paddingRight: '20px',
    height: '65px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: '20px',
  },
  addUserButton: {
    fontSize: '1.05rem',
  },
};
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
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Buscar evoluciones o estudios.."
          searchBarWidth="720px"
          onClick={detailsSearch}
        />
      </Box>
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
    </GridWrapper>
  );
}
