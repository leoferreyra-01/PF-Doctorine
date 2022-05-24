import React from 'react';
import PatientNavBar from '../navbar';
import Calendar from '../../sharedComponents/Calendar';

export default function PatientHome() {
    return (
        <>
            <PatientNavBar />
            <Calendar />
        </>
    );
};