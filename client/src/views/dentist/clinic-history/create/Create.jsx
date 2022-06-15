import React, { useEffect, useState } from 'react';
import s from './createHC.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  postClinicalHistory,
  getClinicalHistory,
} from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import fixhc from './fixhc';
import Swal from 'sweetalert2';

export default function RegisterClinicalHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const HC = useSelector(state => state.clinicalHistory);
  let Id = useSelector(state => state.newPatientId);
  if (Id === 0) {
    Id = SearchedPatient.Patient.ID;
  }

  let [newHC, setNewHC] = useState({
    Smoker: { value: false },
    'Use drugs': { value: false },
    Pregnant: { value: false },
    'Take medicine': { value: false },
    'Suffered from illness': { value: false },
    'Alergic to medicine': { value: false },
    'Normal wound healing': { value: false },
    b_other: { value: '' },
    'Angina pectoris': { value: false },
    'Myocardial infarction': { value: false },
    Hypertension: { value: false },
    'Vascular affections': { value: false },
    ic_other: { value: '' },
    Anemia: { value: false },
    Leukemia: { value: false },
    Haemophilia: { value: false },
    'Alteration white serie': { value: false },
    ih_other: { value: '' },
    Asthma: { value: false },
    'Pulmonary edema': { value: false },
    Ephysemia: { value: false },
    Tuberculosis: { value: false },
    'Chronic bronchitis': { value: false },
    ir_other: { value: '' },
    Ulcer: { value: false },
    Hepatitis: { value: false },
    Cirrohsis: { value: false },
    ig_other: { value: '' },
    Epilepsy: { value: false },
    'Use of tranquilizers': { value: false },
    Seizures: { value: false },
    in_other: { value: '' },
    Osteoporosis: { value: false },
    Paget: { value: false },
    Rickets: { value: false },
    Osteomalacia: { value: false },
    ib_other: { value: '' },
  });
  const arrayToMap = [];
  for (let property in newHC) {
    arrayToMap.push(property);
  }
  let handleChange = e => {
    setNewHC({
      ...newHC,
      [e.target.name]: {
        value:
          e.target.value.toLowerCase() === true
            ? true
            : typeof e.target.value === 'string'
            ? e.target.value
            : false,
      },
    });
  };
  // eslint-disable-next-line
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
    return e.value === true
      ? 'YES'
      : typeof e.value === 'string'
      ? e.value
      : 'NO';
  });
  let finalhc = [];
  newhc3.pop();
  newhcKey.pop();
  for (let i = 0; i < newhc3.length; i++) {
    finalhc.push(`${newhcKey[i]}: ${newhc3[i]}`);
  }

  let handleSubmit = e => {
    e.preventDefault();
    //indice de params
    setNewHC(prevState => {
      return {
        ...prevState,
      };
    });

    Swal.fire({
      title: finalhc,
      showCancelButton: true,
      denyButtonText: `Don't save`,
      confirmButtonText: 'Send',
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed === true) {
        if (HC === 'No hay Hc') {
          Swal.fire('Sent correctly!');

          {
            const fixedhc = fixhc(newHC, Id);

            dispatch(postClinicalHistory(fixedhc));

            navigate(`/home/${Id}`);
          }
        } else if (result.isDenied) {
          Swal.fire('Form not send');
        } else {
          return Swal.fire('Chupala!');
        }
      }
    });
  };
  useEffect(() => {
    dispatch(getClinicalHistory(Id));
  }, []);

  return (
    <div className={s.hc_container}>
      <form onSubmit={handleSubmit}>
        <div>
          {arrayToMap.map((prop, index) => (
            <div key={index}>
              <li>{prop}</li>
              {prop.includes('other') ? (
                <input
                  type="text"
                  name={prop}
                  placeholder="Other related conditions "
                  onChange={handleChange}
                />
              ) : (
                <select name={prop} onChange={handleChange}>
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
              )}

              {/* <input
                type="text"
                name={prop}
                placeholder="Observations"
                onChange={handleInputChange}
              /> */}
            </div>
          ))}
        </div>
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}
