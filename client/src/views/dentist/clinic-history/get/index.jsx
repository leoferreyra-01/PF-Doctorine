import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalHistory } from '../../../../redux/actions';
import s from './hc.module.css';

export default function ClinicalHistory({ id }) {
  const dispatch = useDispatch();

  const { clinicalHistory } = useSelector(state => state);
  // eslint-disable-next-line
  const studies = clinicalHistory.Studies;

  const toRender = [];
  for (const property in clinicalHistory) {
    toRender.push(`${property}: ${clinicalHistory[property]}`);
  }

  toRender.pop();
  toRender.pop();
  toRender.pop();
  toRender.shift();

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
  }, [id]);

  return (
    <div className={s.hc_container}>
      {clinicalHistory ? (
        <div className={s.hc}>
          {toRenderParsed.map(property => (
            <div className={s.studies} key={id}>
              {property}
            </div>
          ))}
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
