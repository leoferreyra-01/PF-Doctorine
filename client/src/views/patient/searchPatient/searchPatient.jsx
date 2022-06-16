import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../searchPatient/searchPatient.css';
import { getPatientBudgets, getPatientDni2 } from '../../../redux/actions';

const searchPatient = () => {
  const dispatch = useDispatch();
  const uno = JSON.parse(window.localStorage.getItem('loggedToken'));
  // dispatch(getPatientDni2(uno.document));
  // const SearchedPatient = JSON.parse(window.localStorage.getItem('user'))
  let SearchedPatient = useSelector(state => state.searchedPatient);

  useEffect(() => {
    dispatch(getPatientDni2(uno.document));
    // dispatch(getPatientBudgets(SearchedPatient.Patient.ID));
    // if (!SearchedPatient.medicalService) {
    // recargar()
    // }
  }, [dispatch]);
  // eslint-disable-next-line
  const recargar = () => {
    SearchedPatient = useSelector(state => state.searchedPatient);
  };

  // console.log(searchedPatient.Patient.medicalService)

  return (
    <div className="container">
      <div className="containe">
        {/* <div > */}
        <div
          style={{
            width: '100%',
            height: '100%',
            margin: '30px',
            border: 'solid black',
            padding: '10px',
            borderWidth: 'thin',
            borderRadius: '5px',
            borderColor: '#009be5',
            // marginBottom: '12px',
          }}
        >
          <div style={{ width: '100%', height: '20%', marginBottom: '10px' }}>
            <h1> {`Welcome ${SearchedPatient.fullName}`}</h1>
          </div>
          <div style={{ width: '100%', height: '20%', marginBottom: '10px' }}>
            <h2>Easily complete all your processes with Doctorine.</h2>
          </div>
          <div style={{ width: '100%', height: '20%', marginBottom: '10px' }}>
            <h2>
              ¡Learn about the virtual solutions we have especially for you
              here!{' '}
            </h2>
          </div>
        </div>
        <div className="containe">
          <div
            style={{
              width: '200px',
              height: '100%',
              margin: '30px',
              border: 'solid black',
              padding: '10px',
              borderWidth: 'thin',
              borderRadius: '5px',
              borderColor: '#009be5',
              // marginBottom: '12px',
            }}
          >
            <div className="list2">
              <div>
                <div className="subtitulo">Medical service</div>
                <div className="contenido">
                  {/* {SearchedPatient.Patient.medicalService} */}
                </div>
              </div>
              <div className="subtitulo">Medical Center</div>
              <div className="contenido">Clinica Henry</div>
              <div className="contenido">San Salvador</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default searchPatient;
