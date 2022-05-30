import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clear, getAllPatients, getPatientDni } from '../../../redux/actions';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import GridWrapper from '../../../sharedComponents/GridWrapper/GridWrapper';
import PatientCard from '../PatientCard/PatientCard';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import s from './search.module.css';
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
      <GridWrapper>
        <Box sx={cardHeaderStyles.wrapper}>
          <SearchBar
            placeholder="Buscar paciente.."
            searchBarWidth="720px"
            onClick={getPatientDni}
          />
        </Box>
        <Alert
          onClose={() => dispatch(clear())}
          severity="error"
          variant="outlined"
        >
          <AlertTitle>Error </AlertTitle>
          Paciente no encontrado — !
          <Link to="./register">
            {' '}
            <button className={s.buton}>Crear paciente?</button>
          </Link>
        </Alert>
      </GridWrapper>
    );
  }

  return (
    <GridWrapper>
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Buscar paciente.."
          searchBarWidth="720px"
          onClick={getPatientDni}
        />
      </Box>
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
    </GridWrapper>
  );
}
