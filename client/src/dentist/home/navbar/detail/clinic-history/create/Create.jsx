import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import GridWrapper from '../../../../../../sharedComponents/GridWrapper/GridWrapper';


export default function RegisterClinicalHistory() {
    
    const { clinicalHistory } = useSelector(state => state);
    console.log(clinicalHistory)
    const toRender = [];
    for (const property in clinicalHistory) {
        toRender.push(`${property}`);  //${clinicalHistory[property]}
    }

    toRender.shift();

    return (
        <GridWrapper>
            <Container maxWidth="xs">        
                <div>
                    {toRender.map((prop, index) => (
                        <>
                            <li key={index}>{prop}</li>
                            <select defaultValue='NO' >
                                <option value='Y'>YES</option>
                                <option value='N'>NO</option>
                            </select>
                        </>
                    ))}
                    <h1>HOLA</h1>
                </div>
            </Container>
        </GridWrapper>
    );
}
