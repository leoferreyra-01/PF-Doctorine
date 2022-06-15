import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import s from './SearchBar.module.css';
import Swal from 'sweetalert2';

export default function SearchBar({ placeholder, handleDni, handleName }) {
  const [searched, setSearched] = useState('');
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();
  const handleOnChange = e => {
    setSearched(e.target.value);
    if (
      /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(e.target.value) ||
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(e.target.value)
    ) {
      setErrors('Wrong search format, please try again');
      Swal.fire({
        icon: 'error',
        title: 'Wrong search format, please try again',
      });
    } else {
      setErrors('');
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (searched && !errors) {
      return /^[0-9]*$/.test(searched)
        ? dispatch(handleDni(searched))
        : dispatch(handleName(searched));
    } else {
      Swal.fire({
        icon: 'error',
        title:
          'The search field is empty, please enter the ID of the patient to search',
      });
    }
    setSearched('');
  };
  return (
    <form onSubmit={handleSubmit} className={s.search_container}>
      <div className={s.icon_input}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="2x"
          className={s.fa_icon}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searched}
          onChange={handleOnChange}
          className={s.input}
        />
      </div>
      <input
        type="submit"
        value="Search"
        className={s.boton}
        disabled={!!errors}
      />
    </form>
  );
}
