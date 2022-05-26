import React from 'react';
import Box from '@mui/material/Box';
import GridWrapper from '../../../sharedComponents/GridWrapper/GridWrapper';
import PatientCard from '../PatientCard/PatientCard';
import SearchBar from '../SearchBar/SearchBar';

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
  },
  addUserButton: {
    fontSize: '1.05rem',
  },
};

export default function SearchComponent() {
  return (
    <GridWrapper>
      <h3>Componente Inicial</h3>
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar placeholder="Buscar paciente.." searchBarWidth="720px" />
      </Box>
      <PatientCard
        name="Vacio de momento"
        lastName="Nada de nada"
        imageProfile="https://i.gyazo.com/91c25cfe3cba6768abc0f2153ce58538.png"
      />
    </GridWrapper>
  );
}
