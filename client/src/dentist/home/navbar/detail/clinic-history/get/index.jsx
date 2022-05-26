import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalHistory } from '../../../../../../redux/actions.js';
import { useParams } from 'react-router-dom';

export default function ClinicalHistory(){
    
    const { id } = useParams();
    
    const dispatch = useDispatch();

    const { clinicalHistory } = useSelector(state => state)
    const toRender = [];
    for(const property in clinicalHistory){
        toRender.push(`${property}: ${clinicalHistory[property]}`)
    }

    const studies = toRender.pop();
    const patient = toRender.pop();
    const patientID = toRender.pop();
    
    console.log('clinicalHistory',clinicalHistory)
    console.log('toRender', toRender)

    useEffect(() => {
        dispatch(getClinicalHistory(id))
    }, [dispatch, id]); 

    return(                                                             // cuando este el update deberia tener un boton aca que muestre el formulario de actualizacion
        <>
            
            { clinicalHistory ? 
                <div>
                    {toRender.map(property => property)}
                </div>
                 
                : <div>
                    <img src='https://giphy.com/gifs/odonto-odontocompany-company-9uIvZGLhJ0MntnhcWy/fullscreen' alt='loading'/>
                </div>

            }
        </>
    );
};