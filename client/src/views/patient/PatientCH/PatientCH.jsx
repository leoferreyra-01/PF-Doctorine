import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicalHistory } from '../../../redux/actions';
import './PatientCH.css';
// import './hc.module.css';
// import ClinicalHistory from '../../dentist/clinic-history/get';
// import PatientCHPdf from './PatientCHPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PatientCHPdf from './PatientCHPdf';

const PatientCH = ({ id }) => {
  const dispatch = useDispatch();
  const { clinicalHistory } = useSelector(state => state);
  const SearchedPatient = useSelector(state => state.searchedPatient);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = day + '/' + month + '/' + year;
  // eslint-disable-next-line
  const patientID = SearchedPatient.Patient.ID;
  const toRender = [];
  // eslint-disable-next-line
  const data = 'ErnestoAbril';

  for (const property in clinicalHistory) {
    toRender.push(`${property}:  ${clinicalHistory[property]}`); //${clinicalHistory[property]}
  }
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

  window.localStorage.setItem('patientCH', JSON.stringify(toRenderParsed));

  console.log(toRenderParsed);
  console.log(toRenderParsed);
  // eslint-disable-next-line
  const [user, setUser] = useState({
    name: SearchedPatient.name,
    lastName: SearchedPatient.lastName,
    document: SearchedPatient.document,
    birth: SearchedPatient.birth,
    street: SearchedPatient.street,
    number: SearchedPatient.number,
    city: SearchedPatient.city,
    postalCode: SearchedPatient.postalCode,
    telephone: SearchedPatient.telephone,
    cellphone: SearchedPatient.cellphone,
    email: SearchedPatient.email,
  });

  useEffect(() => {
    dispatch(getClinicalHistory(2));
    // return () => {
    //   dispatch(clear());
    // };
  }, [dispatch, id]); //]

  // const handleOnClick = () => {
  //   return (
  //     <PatientCHPdf poema={user} ></PatientCHPdf>
  //   )
  // };

  return (
    <div className="container">
      <div className="container2">
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
          {/* </div> */}
        </form>
      </div>
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
      {/* </div> */}
      {/* <button onClick={() => navigate('PatientCHPdf')} type='button' className="button">
        Download
      </button> */}
      <PDFDownloadLink
        document={<PatientCHPdf />}
        fileName="Clinic History.pdf"
      >
        <button className="buttonDownload">Download</button>
      </PDFDownloadLink>
      {/* <PatientCHPdf poema={user}></PatientCHPdf> */}
    </div>
  );
};

export default PatientCH;
