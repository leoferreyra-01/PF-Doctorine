import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalHistory } from '../../../../../../redux/actions.js';
import { useParams } from 'react-router-dom';

export default function ClinicalHistory(){
    
    const { id } = useParams();
    console.log(id)
    const dispatch = useDispatch();

    const { clinicalHistory } = useSelector(state => state)
    console.log('SE MONTO EL COMP',clinicalHistory)

    useEffect(() => {
        dispatch(getClinicalHistory(id))
    }, [dispatch, id]); 

    return(                                                             // cuando este el update deberia tener un boton aca que muestre el formulario de actualizacion
        <>
            
            { clinicalHistory ? 
                <h1>SIIII</h1> 
                : <div>
                    <img src='https://giphy.com/gifs/odonto-odontocompany-company-9uIvZGLhJ0MntnhcWy/fullscreen' alt='loading'/>
                </div>

            }
        </>
    );
};