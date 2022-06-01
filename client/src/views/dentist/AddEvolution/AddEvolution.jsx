import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getMedics, getTooth, getTreatments } from '../../../redux/actions';
import S from './AddEvolution.module.css';

export function validate(data) {
  const errors = {};

  if (!data.observations) {
    errors.observations = 'Observations is required';
  }
  if (!data.treatment) {
    errors.treatment = 'Treatment is required';
  }
  if (!data.teeth) {
    errors.teeth = 'Teeth is required';
  }
  if (!data.medico) {
    errors.medico = 'Medico is required';
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
      alert('Only ONE medic can be selected');
    } else if (data.treatments.length > 0 && name === 'treatments') {
      alert('Only ONE treatment can be selected');
    } else if (data.tooth.length > 0 && name === 'tooth') {
      alert('Only ONE tooth can be selected');
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

  function handleSubmit(e) {
    e.preventDefault(e);
    setErrors(validate(data));
    const errors = validate(data);
    if (Object.keys(errors).length === 0) {
      // dispatch(postEvolution(data, patientID));
    } else {
      alert('Please fill all the fields');
    }
  }

  useEffect(() => {
    dispatch(getTreatments());
    dispatch(getMedics());
    dispatch(getTooth());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={S.content}>
        <form className={S.form} onSubmit={e => handleSubmit(e)}>
          <label className={S.label}>Observations</label>
          <input
            value={data.observations}
            placeholder="Observations..."
            type="text"
            name="observations"
            onChange={handleChange}
          />

          <label className={S.label}>Date</label>
          <input
            value={data.date}
            type="date"
            name="date"
            onChange={handleChange}
          />
          <label className={S.label}>Medic</label>
          <select
            onChange={e => handleSelect(e)}
            name="medico"
            className={S.casillas}
          >
            <option hidden value="">
              Select Medic
            </option>
            {medicos &&
              medicos.map(medicos => (
                <option
                  value={medicos.fullName}
                  className={S.casillas}
                >{`${medicos.fullName}`}</option>
              ))}
          </select>

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
          {data.treatments.length > 0 && (
            <div className={S.treatment}>
              <h4>Selected Treatment</h4>
              <hr />
              <ul>
                {data.treatments.map(t => {
                  let treat = treatment.filter(tr => (tr.ID == t ? tr : null));
                  return (
                    <li key={t.ID}>
                      <button onClick={e => handleDeleteTreatment(e)} name={t}>
                        ❌
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
          {data.tooth.length > 0 && (
            <div className={S.treatment}>
              <h4>Selected Tooth</h4>
              <hr />
              <ul>
                {data.tooth.map(t => {
                  const th = tooth.filter(teeth => teeth.ID == t && teeth);
                  console.log(th);
                  return (
                    <li key={t.ID}>
                      <button onClick={e => handleDeleteTeeth(e)} name={t}>
                        ❌
                      </button>
                      {`${th[0].ID}(zone:${th[0].zone} & pos:${th[0].position})`}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <button type="submit" className={S.btn}>
            Add Evolution
          </button>
        </form>
      </div>
    </>
  );
}

export default addEvolution;