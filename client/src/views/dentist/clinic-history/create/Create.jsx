import React, { useEffect, useState } from 'react';
import s from './createHC.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postClinicalHistory, clear } from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import fixhc from './fixhc';
import Swal from 'sweetalert2';

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
  });
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
  const newhcarray2 = Object.values(newHC);

  const newhcKey = Object.keys(newHC);
  const newhc3 = newhcarray2.map(e => {
    return e.value === true ? 'YES' : 'NO';
  });
  let finalhc = [];
  newhc3.pop();
  newhcKey.pop();
  for (let i = 0; i < newhc3.length; i++) {
    finalhc.push(`${newhcKey[i]}: ${newhc3[i]}`);
  }
  console.log(finalhc);
  let handleSubmit = e => {
    //const arrayToMap1 = [];

    // for (let property in newHC) {
    // arrayToMap1.push(finalhc);
    // }
    setNewHC(prevState => {
      return {
        ...prevState,
      };
    });
    console.log(newHC.patient);
    e.preventDefault();
    Swal.fire({
      title: finalhc,
      showCancelButton: true,
      denyButtonText: `Don't save`,
      confirmButtonText: 'Send',
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed === true) {
        Swal.fire('Sent correctly!');

        {
          const fixedhc = fixhc(newHC, Id);
          console.log(fixedhc);

          dispatch(postClinicalHistory(fixedhc));
          // setNewHC({
          //   Smoker: { value: false, obs: null },
          //   'Use drugs': { value: false, obs: null },
          //   Pregnant: { value: false, obs: null },
          //   'Take medicine': { value: false, obs: null },
          //   'Suffered from illness': { value: false, obs: null },
          //   'Alergic to medicine': { value: false, obs: null },
          //   'Normal wound healing': { value: false, obs: null },
          //   'Angina pectoris': { value: false, obs: null },
          //   'Myocardial infarction': { value: false, obs: null },
          //   Hypertension: { value: false, obs: null },
          //   'Vascular affections': { value: false, obs: null },
          //   Anemia: { value: false, obs: null },
          //   Leukemia: { value: false, obs: null },
          //   Haemophilia: { value: false, obs: null },
          //   'Alteration white serie': { value: false, obs: null },
          //   Asthma: { value: false, obs: null },
          //   'Pulmonary edema': { value: false, obs: null },
          //   Ephysemia: { value: false, obs: null },
          //   Tuberculosis: { value: false, obs: null },
          //   'Chronic bronchitis': { value: false, obs: null },
          //   Ulcer: { value: false, obs: null },
          //   Hepatitis: { value: false, obs: null },
          //   Cirrohsis: { value: false, obs: null },
          //   Epilepsy: { value: false, obs: null },
          //   'Use of tranquilizers': { value: false, obs: null },
          //   Seizures: { value: false, obs: null },
          //   Osteoporosis: { value: false, obs: null },
          //   Paget: { value: false, obs: null },
          //   Rickets: { value: false, obs: null },
          //   Osteomalacia: { value: false, obs: null },
          //   Other: { value: false, obs: null },
          //   patient: 21,
          // });
          navigate(`/home/${Id}`);
        }
      } else if (result.isDenied) {
        Swal.fire('Form not send');
      }
    });

    //   if (Swal === true) {
    //     const fixedhc = fixhc(newHC);
    //     console.log(fixedhc);
    //     dispatch(postClinicalHistory(fixedhc));
    //     setNewHC({
    //       Smoker: { value: false, obs: null },
    //       'Use drugs': { value: false, obs: null },
    //       Pregnant: { value: false, obs: null },
    //       'Take medicine': { value: false, obs: null },
    //       'Suffered from illness': { value: false, obs: null },
    //       'Alergic to medicine': { value: false, obs: null },
    //       'Normal wound healing': { value: false, obs: null },
    //       'Angina pectoris': { value: false, obs: null },
    //       'Myocardial infarction': { value: false, obs: null },
    //       Hypertension: { value: false, obs: null },
    //       'Vascular affections': { value: false, obs: null },
    //       Anemia: { value: false, obs: null },
    //       Leukemia: { value: false, obs: null },
    //       Haemophilia: { value: false, obs: null },
    //       'Alteration white serie': { value: false, obs: null },
    //       Asthma: { value: false, obs: null },
    //       'Pulmonary edema': { value: false, obs: null },
    //       Ephysemia: { value: false, obs: null },
    //       Tuberculosis: { value: false, obs: null },
    //       'Chronic bronchitis': { value: false, obs: null },
    //       Ulcer: { value: false, obs: null },
    //       Hepatitis: { value: false, obs: null },
    //       Cirrohsis: { value: false, obs: null },
    //       Epilepsy: { value: false, obs: null },
    //       'Use of tranquilizers': { value: false, obs: null },
    //       Seizures: { value: false, obs: null },
    //       Osteoporosis: { value: false, obs: null },
    //       Paget: { value: false, obs: null },
    //       Rickets: { value: false, obs: null },
    //       Osteomalacia: { value: false, obs: null },
    //       Other: { value: false, obs: null },
    //       patient: Id,
    //     });
    //     navigate(`/home/${Id}`);
    //   } else return false;
  };

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  });
  // useEffect(() => {
  //   return () => {
  //     dispatch(clear());
  //   };
  // });

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
                placeholder="Observations"
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
