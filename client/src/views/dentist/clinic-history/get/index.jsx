import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalHistory } from '../../../../redux/actions';
import s from './hc.module.css';
import './PatientCH.css';

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
    return property;
  });

  useEffect(() => {
    dispatch(getClinicalHistory(id));
  }, [id]);

  return (
    // <div className={s.hc_container}>
    //   {clinicalHistory ? (
    //     <div className={s.hc}>
    //       {toRenderParsed.map(property => (
    //         <div className={s.studies} key={id}>
    //           {property}
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <div>
    //       <img
    //         src="https://giphy.com/gifs/odonto-odontocompany-company-9uIvZGLhJ0MntnhcWy/fullscreen"
    //         alt="loading"
    //       />
    //     </div>
    //   )}
    // </div>
    <div className="container">
      {/* <div className="container2">
        <form>
          <div className="rowContainer">
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className="subtitle">Document</div>
              <input
                className="input"
                name="document"
                value={user.document}
                // onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '20vw' }}>
              <div className="subtitle">Name</div>
              <input
                className="input"
                name="name"
                value={user.name}
                // onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '20vw' }}>
              <div className="subtitle">Lastname</div>
              <input
                className="input"
                name="lastName"
                value={user.lastName}
                // onChange={handleChange}
              ></input>
            </div>
            <div className="containerDivInput" style={{ width: '12vw' }}>
              <div className="subtitle">Date</div>
              <input
                type="text"
                // name="birth"
                className="input"
                value={date}
                // onChange={handleChange}
              ></input>
            </div>
          </div>
        </form>
      </div> */}
      {/* <div className="container"> */}
      <div className="container3">
        {' '}
        Clinic History Details
        <div>
          <div className="rowContainer">
            {toRenderParsed ? (
              <div className="rowContainer2">
                {toRenderParsed.map(property => (
                  <div className="property" key={id}>
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

            {/* <ClinicalHistory className='container3' id={patientID} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
