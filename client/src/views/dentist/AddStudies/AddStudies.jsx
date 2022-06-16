import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { postStudy } from '../../../redux/actions';
import S from './Study.module.css';
import FileUpload from '../../../FileUpload/FileUpload';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function validate(data) {
  const errors = {};

  if (!data.studyType) {
    errors.studyType = 'Study is required';
  }
  if (!data.description) {
    errors.description = 'Observations is required';
  }

  return errors;
}

function AddStudy() {
  const navigate = useNavigate();
  const { patientID } = useParams(); // eslint-disable-next-line
  const studies = useSelector(state => state.studies); //studyType, Description, attatch, clinicalHistoryId, patientId
  const urlstudy = useSelector(state => state.urlstudy);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    description: '',
    //date: '',
    studyType: '',
    patient: patientID,
  });
  // eslint-disable-next-line
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

    if (data.studyType.length > 0 && name === 'studyType') {
      Swal.fire({
        icon: 'error',
        title: 'You can only select ONE study',
      });
    } else {
      setData({
        ...data,
        [e.target.name]: value,
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
      const fixstudie = {
        ...data,
        attach: urlstudy,
      };
      dispatch(postStudy(fixstudie));

      Swal.fire({
        icon: 'success',
        title: 'Study sent correctly!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/home/${patientID}`, { replace: true });
      setData({
        description: '',
        //date: '',
        studyType: '',
        patient: patientID,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please complete all the fields',
      });
    }
  }

  return (
    <div className={S.studiesContainer}>
      <Toaster position="top-center" reverseOrder={false} />
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
            name="studyType"
            className={S.casillas2}
          >
            <option hidden value="">
              Select Study
            </option>
            <option value="laboratory">Laboratory</option>
            <option value="complementary">Complementary</option>
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
            value={data.description}
            placeholder="Observations"
            type="text"
            name="description"
            onChange={handleChange}
          />

          <FileUpload />
          <button className={S.btn2} type="submit">
            <span className={S.transition}></span>
            <span className={S.gradient}></span>
            <span className={S.label}>Add Study</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudy;
