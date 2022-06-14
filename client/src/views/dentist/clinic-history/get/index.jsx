import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalHistory, clear } from '../../../../redux/actions';
import s from './hc.module.css';
export default function ClinicalHistory({ id }) {
  const dispatch = useDispatch();

  const { clinicalHistory } = useSelector(state => state);

  const studies = clinicalHistory.Studies;
  const patient = clinicalHistory.Patient; //datos a renderizar en el header
  const patientID = clinicalHistory.PatientID;

  const toRender = [];
  for (const property in clinicalHistory) {
    toRender.push(`${property}: ${clinicalHistory[property]}`); //${clinicalHistory[property]}
  }

  toRender.pop(); //de aca saco las tres cosas que guarde arriba
  toRender.pop(); //como studies, patient y patient ID
  toRender.pop();
  toRender.shift(); //Y de aca saco el ID para que no se renderice

  const toRenderParsed = toRender.map(property => {
    if (property.charAt(0) === 'b' && property.charAt(1) === '_') {
      return property
        .substring(2)
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
        .toUpperCase();
    }

    if (property.charAt(0) === 'i') {
      if (property.charAt(1) === 'c' && property.charAt(2) === '_') {
        return property
          .substring(3)
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
          .toUpperCase();
      }
      if (property.charAt(1) === 'h' && property.charAt(2) === '_') {
        return property
          .substring(3)
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
          .toUpperCase();
      }
      if (property.charAt(1) === 'r' && property.charAt(2) === '_') {
        return property
          .substring(3)
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
          .toUpperCase();
      }
      if (property.charAt(1) === 'g' && property.charAt(2) === '_') {
        return property
          .substring(3)
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
          .toUpperCase();
      }
      if (property.charAt(1) === 'n' && property.charAt(2) === '_') {
        return property
          .substring(3)
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
          .toUpperCase();
      }
      if (property.charAt(1) === 'b' && property.charAt(2) === '_') {
        return property
          .substring(3)
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
          .toUpperCase();
      }
    }
  });

  useEffect(() => {
    dispatch(getClinicalHistory(id));

    // return () => {
    //   dispatch(clear());
    // };
  }, [dispatch, id]); //]

  return (
    // cuando este el update deberia tener un boton aca que muestre el formulario de actualizacion
    <div className={s.hc_container}>
      {clinicalHistory ? (
        <div className={s.hc}>
          {toRenderParsed.map(property => (
            <div className={s.studies} key={id}>
              {property}
            </div>
          ))}

          <div>
            {studies
              ? studies.map(study => study)
              : 'No studies have been done yet.'}
          </div>
        </div>
      ) : (
        <div>
          <img
            src="https://giphy.com/gifs/odonto-odontocompany-company-9uIvZGLhJ0MntnhcWy/fullscreen"
            alt="loading"
          />
        </div>
      )}
    </div>
  );
}
