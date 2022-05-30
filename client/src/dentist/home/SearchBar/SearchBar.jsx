import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import CommonButton from '../../../sharedComponents/CommonButton/CommonButton';
import s from './btn.module.css';
export default function SearchBar({ placeholder, searchBarWidth, onClick }) {
  const [searched, setSearched] = useState('');
  const dispatch = useDispatch();
  const handleOnChange = e => {
    console.log(e.target.value);
    setSearched(e.target.value);
  };
  function handleenter(e) {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }
  const handleSubmit = () => {
    if (searched) {
      dispatch(onClick(searched));
    } else {
      alert(
        'El campo de busqueda esta vacio, por favor ingrese el dni del paciente a buscar'
      );
    }
    setSearched('');
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchIcon sx={{ marginRight: '10px' }} />
        <Input
          placeholder={placeholder}
          onChange={handleOnChange}
          onKeyPress={handleenter}
          sx={{
            width: searchBarWidth,
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '1.1rem',
          }}
          disableUnderline
        />
        <div className={s.boton}>
          <CommonButton variant="contained" onClick={handleSubmit} size="large">
            Buscar
          </CommonButton>
        </div>
      </Box>
    </div>
  );
}
