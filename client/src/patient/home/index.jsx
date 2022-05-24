import React from 'react';
import PatientNavBar from '../navbar';
import Calendar from '../../common/calendar/Calendar';

export default function PatientHome() {
    return (
        <>
            <PatientNavBar />
            <Calendar />
        </>
    );
};