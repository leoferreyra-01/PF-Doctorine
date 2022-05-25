import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getClinicalHistory } from '../..';
import {  useParams } from 'react-router-dom';

export default function ClinicalHistory(){
    
    const { ID } = useParams();
    const dispatch = useDispatch();
    console.log(ID)
    useEffect(() => {
        dispatch(getClinicalHistory(ID))
    }, [dispatch, ID]); 

    return(
        <>

        </>
    );
};