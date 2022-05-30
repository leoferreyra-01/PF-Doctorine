import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import GridWrapper from '../../../../../../sharedComponents/GridWrapper/GridWrapper';
import { postClinicalHistory, clear } from '../../../../../../redux/actions.js';
import { useNavigate, useParams } from 'react-router-dom';
import fixhc from './fixhc';
export default function RegisterClinicalHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Id = useSelector(state => state.newPatientId);
  console.log(Id);
  let [newHC, setNewHC] = useState({
    Smoker: { value: false, obs: null },
    'Use drugs': { value: false, obs: null },
    Pregnant: { value: false, obs: null },
    'Take medicine': { value: false, obs: null },
    'Suffered from illness': { value: false, obs: null },
    'Alergic to medicine': { value: false, obs: null },
    'Normal wound healing': { value: false, obs: null },
    'Angina pectoris': { value: false, obs: null },
    'Myocardial infarction': { value: false, obs: null },
    Hypertension: { value: false, obs: null },
    'Vascular affections': { value: false, obs: null },
    Anemia: { value: false, obs: null },
    Leukemia: { value: false, obs: null },
    Haemophilia: { value: false, obs: null },
    'Alteration white serie': { value: false, obs: null },
    Asthma: { value: false, obs: null },
    'Pulmonary edema': { value: false, obs: null },
    Ephysemia: { value: false, obs: null },
    Tuberculosis: { value: false, obs: null },
    'Chronic bronchitis': { value: false, obs: null },
    Ulcer: { value: false, obs: null },
    Hepatitis: { value: false, obs: null },
    Cirrohsis: { value: false, obs: null },
    Epilepsy: { value: false, obs: null },
    'Use of tranquilizers': { value: false, obs: null },
    Seizures: { value: false, obs: null },
    Osteoporosis: { value: false, obs: null },
    Paget: { value: false, obs: null },
    Rickets: { value: false, obs: null },
    Osteomalacia: { value: false, obs: null },
    Other: { value: false, obs: null }, // son varios other
    patient: 21,
  });
  console.log(newHC.patient);
  const arrayToMap = [];
  for (let property in newHC) {
    arrayToMap.push(property);
  }

  let handleChange = e => {
    e.preventDefault();
    console.log(e.target.value.toLowerCase());
    setNewHC({
      ...newHC,
      [e.target.name]: {
        value: e.target.value.toLowerCase() === 'no' ? false : true,
        obs: null,
      },
    });
  };

  let handleInputChange = e => {
    e.preventDefault();
    setNewHC(prevState => {
      return {
        ...prevState,
        [e.target.name]: {
          value: prevState[e.target.name].value,
          obs: e.target.value,
        },
      };
    });
  };

  let handleSubmit = e => {
    e.preventDefault();

    let response = window.confirm(
      'Are you sure you finished? This cannot be changed later'
    );

    if (response === true) {
      const fixedhc = fixhc(newHC);
      console.log(fixedhc);
      dispatch(postClinicalHistory(fixedhc));
      setNewHC({
        Smoker: { value: 'no', obs: null },
        'Use drugs': { value: 'no', obs: null },
        Pregnant: { value: 'no', obs: null },
        'Take medicine': { value: 'no', obs: null },
        'Suffered from illness': { value: 'no', obs: null },
        'Alergic to medicine': { value: 'no', obs: null },
        'Normal wound healing': { value: 'no', obs: null },
        'Angina pectoris': { value: 'no', obs: null },
        'Myocardial infarction': { value: 'no', obs: null },
        Hypertension: { value: 'no', obs: null },
        'Vascular affections': { value: 'no', obs: null },
        Anemia: { value: 'no', obs: null },
        Leukemia: { value: 'no', obs: null },
        Haemophilia: { value: 'no', obs: null },
        'Alteration white serie': { value: 'no', obs: null },
        Asthma: { value: 'no', obs: null },
        'Pulmonary edema': { value: 'no', obs: null },
        Ephysemia: { value: 'no', obs: null },
        Tuberculosis: { value: 'no', obs: null },
        'Chronic bronchitis': { value: 'no', obs: null },
        Ulcer: { value: 'no', obs: null },
        Hepatitis: { value: 'no', obs: null },
        Cirrohsis: { value: 'no', obs: null },
        Epilepsy: { value: 'no', obs: null },
        'Use of tranquilizers': { value: 'no', obs: null },
        Seizures: { value: 'no', obs: null },
        Osteoporosis: { value: 'no', obs: null },
        Paget: { value: 'no', obs: null },
        Rickets: { value: 'no', obs: null },
        Osteomalacia: { value: 'no', obs: null },
        Other: { value: 'no', obs: null },
        patient: parseInt(Id),
      });
      navigate(`/home/${Id}`);
    } else return false;
  };

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  });

  return (
    <GridWrapper>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <div>
            {arrayToMap.map((prop, index) => (
              <div key={index}>
                <li>{prop}</li>
                <select name={prop} onChange={handleChange}>
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                <input
                  type="text"
                  name={prop}
                  placeholder="obs..."
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <input type="submit" value="SUBMIT" />
        </form>
      </Container>
    </GridWrapper>
  );
}
