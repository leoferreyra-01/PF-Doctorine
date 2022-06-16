import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMedics,
  getTooth,
  getTreatments,
  postEvolution,
} from '../../../redux/actions';
import Swal from 'sweetalert2';
import S from './AddEvolution.module.css';

export function validate(data) {
  let errors = {};

  if (!data.observations) {
    errors.observations = 'Observation is required';
  }
  if (!data.treatments || data.treatments.length === 0) {
    errors.treatments = 'Treatment is required';
  }
  if (!data.tooth || data.tooth.length === 0) {
    errors.tooth = 'Teeth is required';
  }
  if (!data.medico || data.medico.length === 0) {
    errors.medico = 'Medic is required';
  }
  if (!data.date) {
    errors.date = 'Date is required';
  }
  return errors;
}

function addEvolution() {
  const { patientID } = useParams();
  const treatment = useSelector(state => state.treatments);
  const medicos = useSelector(state => state.medics);
  const tooth = useSelector(state => state.tooth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    observations: '',
    medico: [],
    date: '',
    treatments: [],
    tooth: [],
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    const { name, value } = e.target;
    if (data.medico.length > 0 && name === 'medico') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can only select ONE medic',
      });
    } else if (data.treatments.length > 0 && name === 'treatments') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can only select ONE treatment',
      });
    } else if (data.tooth.length > 0 && name === 'tooth') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can only select ONE teeth',
      });
    } else {
      setData({
        ...data,
        [e.target.name]: [value],
      });
      setErrors(
        validate({
          ...data,
          [e.target.name]: value,
        })
      );
    }
  }

  function handleDeleteTreatment(e) {
    e.preventDefault();
    setData({
      ...data,
      treatments: data.treatments.filter(t => t !== e.target.name),
    });
  }

  function handleDeleteTeeth(e) {
    e.preventDefault();
    setData({
      ...data,
      tooth: data.tooth.filter(teeth => teeth !== e.target.name),
    });
  }

  function handleDeleteMedic(e) {
    e.preventDefault();
    setData({
      ...data,
      medico: data.medico.filter(m => m !== e.target.name),
    });
  }

  const evolution = {
    date: data.date,
    observations: data.observations,
    PatientID: patientID,
    MedicID: data.medico[0],
    TreatmentID: data.treatments[0],
    toothID: data.tooth[0],
  };

  async function handleSubmit(e) {
    e.preventDefault(e);
    setErrors(validate(data));
    const errors = validate(data);
    if (Object.keys(errors).length === 0) {
      try {
        dispatch(postEvolution(evolution));
        Swal.fire({
          icon: 'success',
          title: 'Evolution added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/home/${patientID}`);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error adding evolution',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please fill all the fields',
      });
    }
  }

  useEffect(() => {
    dispatch(getTreatments());
    dispatch(getMedics());
    dispatch(getTooth());
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={S.content}>
        <form className={S.form} onSubmit={e => handleSubmit(e)}>
          <label className={S.label}>Observations</label>
          <input
            value={data.observations}
            placeholder="Observations"
            type="text"
            name="observations"
            onChange={handleChange}
          />

          {errors.observations && (
            <p className={S.err}>{errors.observations}</p>
          )}

          <label className={S.label}>Date</label>
          <input
            value={data.date}
            type="date"
            name="date"
            onChange={handleChange}
          />

          {errors.date && <p className={S.err}>{errors.date}</p>}

          <label className={S.label}>Medic</label>
          <select
            onChange={e => handleSelect(e)}
            name="medico"
            className={S.casillas}
          >
            <option value="">Select Medic</option>
            {medicos &&
              medicos.map(medicos => (
                <option
                  value={medicos.ID}
                  className={S.casillas}
                >{`${medicos.fullName} (${medicos.Medic.tuition_number})`}</option>
              ))}
          </select>

          {errors.medico && <p className={S.err}>{errors.medico}</p>}

          {data.medico.length > 0 && (
            <div className={S.treatment}>
              <h4>Medic selected</h4>
              <hr />
              <ul>
                {data.medico.map(t => {
                  let medic = medicos.filter(me =>
                    me.ID === parseInt(t) ? me : null
                  );
                  return (
                    <li key={t.ID}>
                      <button onClick={e => handleDeleteMedic(e)} name={t}>
                        <span role="img" aria-label="X">
                          ❌
                        </span>
                      </button>

                      {`${medic[0].name}${medic[0].lastName} (${medic[0].Medic.tuition_number})`}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <label className={S.label}>Treatment</label>
          <select
            onChange={e => handleSelect(e)}
            name="treatments"
            className={S.casillas2}
          >
            <option hidden value="">
              Select Treatment
            </option>
            {treatment &&
              treatment.map(tr => (
                <option
                  value={tr.ID}
                  className={S.casillas}
                >{`${tr.description}(${tr.ID})`}</option>
              ))}
          </select>

          {errors.treatments && <p className={S.err}>{errors.treatments}</p>}

          {data.treatments.length > 0 && (
            <div className={S.treatment}>
              <h4>Treatment selected</h4>
              <hr />
              <ul>
                {data.treatments.map(t => {
                  let treat = treatment.filter(tr => (tr.ID === t ? tr : null));
                  return (
                    <li key={t.ID}>
                      <button onClick={e => handleDeleteTreatment(e)} name={t}>
                        <span role="img" aria-label="X">
                          ❌
                        </span>
                      </button>
                      {`${treat[0].description}(${treat[0].ID})`}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <label className={S.label}>Teeth</label>
          <select
            onChange={e => handleSelect(e)}
            name="tooth"
            className={S.casillas2}
          >
            <option hidden value="">
              Select Teeth
            </option>
            {tooth &&
              tooth.map(t => (
                <option
                  value={t.ID}
                  className={S.casillas}
                >{`${t.ID}(zone:${t.zone} & pos:${t.position})`}</option>
              ))}
          </select>

          {errors.tooth && <p className={S.err}>{errors.tooth}</p>}
          {data.tooth.length > 0 && (
            <div className={S.treatment}>
              <h4>Teeth selected</h4>
              <hr />
              <ul>
                {data.tooth.map(t => {
                  const th = tooth.filter(
                    teeth => teeth.ID === parseInt(t) && teeth
                  );
                  return (
                    <li key={t.ID}>
                      <button onClick={e => handleDeleteTeeth(e)} name={t}>
                        <span role="img" aria-label="X">
                          ❌
                        </span>
                      </button>
                      {`${th[0].ID}(zone:${th[0].zone} & pos:${th[0].position})`}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <button className={S.btn2} type="submit">
            <span className={S.transition}></span>
            <span className={S.gradient}></span>
            <span className={S.label}>Add Evolution</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default addEvolution;
