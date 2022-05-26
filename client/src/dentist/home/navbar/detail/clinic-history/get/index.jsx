import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalHistory } from '../../../../../../redux/actions.js';
import { useParams } from 'react-router-dom';
import GridWrapper from '../../../../../../sharedComponents/GridWrapper/GridWrapper.jsx';

export default function ClinicalHistory() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { clinicalHistory } = useSelector(state => state);

  const studies = clinicalHistory.Studies;
  console.log('studies', studies);
  const patient = clinicalHistory.Patient;  //datos a renderizar en el header
  console.log('patient', patient);
  const patientID = clinicalHistory.PatientID;
  console.log('patientID', patientID);

  const toRender = [];
  for (const property in clinicalHistory) {
    toRender.push(`${property}: ${clinicalHistory[property]}`);  //${clinicalHistory[property]}
  }

  toRender.pop();
  toRender.pop();
  toRender.pop();
  toRender.shift();

  console.log('clinicalHistory', clinicalHistory);
  console.log('toRender', toRender);

  useEffect(() => {
    dispatch(getClinicalHistory(id));
  }, [dispatch, id]);

  return (
    // cuando este el update deberia tener un boton aca que muestre el formulario de actualizacion
    <GridWrapper>
      {clinicalHistory ? (
        <>
        {/* <div>
          {patient}
        </div> */}

        <div>{toRender.map(property => (
          <div key={id}>
          {property}
          </div>
        ))}</div>

          <div>
            {studies ? studies.map(study => study) : 'No studies have been done yet.'}
          </div>
        </>
      ) : (
        <div>
          <img
            src="https://giphy.com/gifs/odonto-odontocompany-company-9uIvZGLhJ0MntnhcWy/fullscreen"
            alt="loading"
          />
        </div>
      )}
    </GridWrapper>
  );
}
