import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';

export default function NavBar() {
    return (
        <>
            <Link to='/createPatient'>
                <button>Create new patient</button>
            </Link>

            <SearchBar/>
        </>
    );
};