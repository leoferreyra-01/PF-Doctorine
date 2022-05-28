import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import GridWrapper from '../../../../../../sharedComponents/GridWrapper/GridWrapper';
import { postClinicalHistory, clear } from '../../../../../../redux/actions.js';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegisterClinicalHistory() {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    let [newHC, setNewHC] = useState({
        "Smoker": {value: 'no', obs: null},
        "Use drugs": {value: 'no', obs: null},
        "Pregnant": {value: 'no', obs: null},
        "Take medicine": {value: 'no', obs: null},
        "Suffered from illness": {value: 'no', obs: null},
        "Alergic to medicine": {value: 'no', obs: null},
        "Normal wound healing": {value: 'no', obs: null},
        "Angina pectoris": {value: 'no', obs: null},
        "Myocardial infarction": {value: 'no', obs: null},
        "Hypertension": {value: 'no', obs: null},
        "Vascular affections": {value: 'no', obs: null},
        "Anemia": {value: 'no', obs: null},
        "Leukemia": {value: 'no', obs: null},
        "Haemophilia": {value: 'no', obs: null},
        "Alteration white serie": {value: 'no', obs: null},
        "Asthma": {value: 'no', obs: null},
        "Pulmonary edema": {value: 'no', obs: null},
        "Ephysemia": {value: 'no', obs: null},
        "Tuberculosis": {value: 'no', obs: null},
        "Chronic bronchitis": {value: 'no', obs: null},
        "Ulcer": {value: 'no', obs: null},
        "Hepatitis": {value: 'no', obs: null},
        "Cirrohsis": {value: 'no', obs: null},
        "Epilepsy": {value: 'no', obs: null},
        "Use of tranquilizers": {value: 'no', obs: null},
        "Seizures": {value: 'no', obs: null},
        "Osteoporosis": {value: 'no', obs: null},
        "Paget": {value: 'no', obs: null},
        "Rickets": {value: 'no', obs: null},
        "Osteomalacia": {value: 'no', obs: null},
        "Other": {value: 'no', obs: null},
    });


    const arrayToMap = [];
    for (let property in newHC) {
        arrayToMap.push(property);
    };

    let handleChange = (e) => {
        e.preventDefault();
        setNewHC({
            ...newHC,
            [e.target.name]: {value: e.target.value.toLowerCase(), obs: null}
        });
    };

    let handleInputChange = (e) =>{
        e.preventDefault();
        setNewHC(prevState => {
            return {  
                ...prevState,
                [e.target.name]: {value: prevState[e.target.name].value, obs: e.target.value}
            }
        });
    }

    let handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(postClinicalHistory(newHC));
        setNewHC({
            "Smoker": 'no',
            "Use drugs": 'no',
            "Pregnant": 'no',
            "Take medicine": 'no',
            "Suffered from illness": 'no',
            "Alergic to medicine": 'no',
            "Normal wound healing": 'no',
            "Angina pectoris": 'no',
            "Myocardial infarction": 'no',
            "Hypertension": 'no',
            "Vascular affections": 'no',
            "Anemia": 'no',
            "Leukemia": 'no',
            "Haemophilia": 'no',
            "Alteration white serie": 'no',
            "Asthma": 'no',
            "Pulmonary edema": 'no',
            "Ephysemia": 'no',
            "Tuberculosis": 'no',
            "Chronic bronchitis": 'no',
            "Ulcer": 'no',
            "Hepatitis": 'no',
            "Cirrohsis": 'no',
            "Epilepsy": 'no',
            "Use of tranquilizers": 'no',
            "Seizures": 'no',
            "Osteoporosis": 'no',
            "Paget": 'no',
            "Rickets": 'no',
            "Osteomalacia": 'no',
            "Other": 'no',
        });
        navigate(`/patients/${id}`)
    };
   
    useEffect(()=>{
        return () => {
            dispatch(clear())
        }; 
    });

    return (
        <GridWrapper>
            <Container maxWidth="xs">
                <div>
                    {arrayToMap.map((prop, index) => (
                        <div key={index}>
                            <li>{prop}</li>
                            <select  name={prop} onChange={handleChange}>
                                <option value='NO'>NO</option>
                                <option value='YES'>YES</option>
                            </select>
                            <input type='text' name={prop} placeholder='obs...' onChange={handleInputChange} />
                        </div>
                    ))}
                </div>
                <button onSubmit={handleSubmit}>SUBMIT</button>
            </Container>
        </GridWrapper>
    );
}
