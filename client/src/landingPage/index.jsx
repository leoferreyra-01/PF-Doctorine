import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
    return(
        //if select === odontologo: home de odontologo; else home de paciente
        <Link to='/home'>
            <button>BOTON TEMPORAL</button>
        </Link>
    )
}