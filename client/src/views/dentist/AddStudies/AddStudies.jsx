import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getTreatments } from '../../../redux/actions';
import S from './Study.module.css';

export function validate(data) {
  const errors = {};

  if (!data.studies) {
    errors.studies = 'Study is required';
  }
  if (!data.observations) {
    errors.observations = 'Observations is required';
  }
  
  return errors;
}

function AddStudy() {
  const { patientID } = useParams();
  const studies = useSelector(state => state.studiess); //studyType, Description, attatch, clinicalHistoryId, patientId
 
  
  const dispatch = useDispatch();

  const [data, setData] = useState({
    observations: '',   //description
    //date: '',         
    studies: [],        //studyType
    attach: [],
    patientId: patientID       
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
    
    if (data.studies.length > 0 && name === 'studies') {
      alert('Only ONE study can be selected');
    }
     else {
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


  function handleSubmit(e) {
    e.preventDefault(e);
    setErrors(validate(data));
    const errors = validate(data);
    if (Object.keys(errors).length === 0) {
      // dispatch(postStudy(data, patientID));
    } else {
      alert('Please fill all the fields');
    }
  }

  useEffect(() => {
    // dispatch(getTreatments());
    
  }, [dispatch]);

  return (
    <div className={S.studiesContainer}>
      <Toaster position='top-center' reverseOrder={false} />
      <div className={S.content}>
        <form className={S.form} onSubmit={e => handleSubmit(e)}>
          

          {/* <label className={S.label}>Date</label>
          <input
            value={data.date}
            type='date'
            name='date'
            onChange={handleChange}
          /> */}

          <label className={S.label}>Study</label>
          <select
            onChange={e => handleSelect(e)}
            name='studies'
            className={S.casillas2}>
            <option hidden value=''>
              Select Study
            </option>
            <option value='laboratory'>
              Laboratory
            </option>
            <option value='complementary'>
              Complementary
            </option>
            {/* {studies &&
              studies.map(st => (
                <option
                  value={st.ID}
                  className={
                    S.casillas
                  }>{`${st.studies}(${st.ID})`}</option>
              ))} */}
          </select>
          
          <label className={S.label}>Description</label>
          <input
            value={data.observations}
            placeholder='Observations...'
            type='text'
            name='observations'
            onChange={handleChange}
          />


          <label className={S.label}>Attach document</label>
          <input type='file' name='attach'/>    


          <button type='submit' className={S.btn}>
            Add Study
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudy;