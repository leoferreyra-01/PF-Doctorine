import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPatientName } from '../../../redux/actions';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import CommonButton from '../../../sharedComponents/CommonButton/CommonButton';

export default function SearchBar({ placeholder, searchBarWidth }) {
  const [searched, setSearched] = useState('');
  const dispatch = useDispatch();
  const handleOnChange = e => {
    console.log(e.target.value);
    setSearched(e.target.value);
  };
  const handleSubmit = () => {
    if (searched) {
      dispatch(getPatientName(searched.toLowerCase()));
    } else {
      alert(
        'El campo de busqueda esta vacio, por favor ingrese el nombre del paciente a buscar'
      );
    }
    setSearched('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SearchIcon sx={{ marginRight: '10px' }} />
      <Input
        placeholder={placeholder}
        onChange={handleOnChange}
        sx={{
          width: searchBarWidth,
          color: 'rgba(0, 0, 0, 0.6)',
          fontSize: '1.1rem',
        }}
        disableUnderline
      />
      <CommonButton variant="contained" onClick={handleSubmit} size="large">
        Buscar
      </CommonButton>
    </Box>
  );
}
