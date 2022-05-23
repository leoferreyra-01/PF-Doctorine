import React from 'react';
import NavBar from './navbar';
import Calendar from './calendar';
import Budget from './budget';

export default function Home(){
    return(
        <>
            <NavBar/>
            <Calendar/>
            <Budget/>
        </>
    )
};