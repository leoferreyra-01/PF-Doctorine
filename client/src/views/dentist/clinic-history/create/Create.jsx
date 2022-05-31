import React, { useEffect, useState } from 'react';
import s from './createHC.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postClinicalHistory, clear } from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';
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
    patient: Id,
  });
  console.log(newHC.patient);
  const arrayToMap = [];
  for (let property in newHC) {
    arrayToMap.push(property);
  }

  let handleChange = e => {
    console.log(e.target.value.toLowerCase());
    setNewHC({
      ...newHC,
      [e.target.name]: {
        value: e.target.value.toLowerCase() === false ? false : true,
        obs: null,
      },
    });
  };

  let handleInputChange = e => {
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
        Other: { value: false, obs: null },
        patient: Id,
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
    <div className={s.hc_container}>
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
    </div>
  );
}
