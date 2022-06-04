import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import S from "./UpdatePatient.module.css";
import axios from "axios";

export function validate(data) {
  let errors = {};
  return errors;
}

function addEvolution() {
  const { patientID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    lastName: "",
    document: "",
    birth: "",
    tepephone: "",
    cellphone: "",
    street: "",
    number: "",
    city: "",
    postalCode: "",
    medicalService: "",
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
  const infoUser = {
    name: data.name,
    lastName: data.lastName,
    document: parseInt(data.document),
    birth: data.birth,
    tepephone: parseInt(data.tepephone),
    cellphone: parseInt(data.cellphone),
    street: data.street,
    number: parseInt(data.number),
    city: data.city,
    postalCode: parseInt(data.postalCode),
  };
  const infoPatient = {
    medicalService: data.medicalService,
  };
  const ID = parseInt(patientID);

  function handleSubmit() {
    console.log({ infoUser, infoPatient, patientID });
    axios
      .put(`/patients/${patientID}`, {
        ID: ID,
        infoUser: infoUser,
        infoPatient: infoPatient,
      })
      .then((response) => {
        toast.success(response.data.success);
        navigate("/");
      })
      .catch(() => {
        return toast.error("Este usuario ya ha sido creado.");
      });
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={S.content}>
        <form className={S.form}>
          
            <label className={S.label}>Frist Name</label>
            <input
              value={data.name}
              placeholder="Name..."
              type="text"
              name="name"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Last Name</label>
            <input
              value={data.lastName}
              placeholder="LastName..."
              type="text"
              name="lastName"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Document</label>
            <input
              value={data.document}
              placeholder="Document..."
              type="text"
              name="document"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Birth</label>
            <input
              value={data.birth}
              placeholder="Birth..."
              type="date"
              name="birth"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Telephone</label>
            <input
              value={data.tepephone}
              placeholder="Telephone..."
              type="text"
              name="telephone"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Cellphone</label>
            <input
              value={data.cellphone}
              placeholder="Cellphone..."
              type="text"
              name="cellphone"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Street</label>
            <input
              value={data.street}
              placeholder="Street..."
              type="text"
              name="street"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Number</label>
            <input
              value={data.number}
              placeholder="Number..."
              type="text"
              name="number"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>City</label>
            <input
              value={data.city}
              placeholder="City..."
              type="text"
              name="city"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Postal Code</label>
            <input
              value={data.postalCode}
              placeholder="Postal Code..."
              type="text"
              name="postalCode"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <label className={S.label}>Medical Service</label>
            <input
              value={data.medicalService}
              placeholder="Medical Service..."
              type="text"
              name="medicalService"
              onChange={handleChange}
            />
            {errors.observations && <p>{errors.observations}</p>}

            <button type="submit" className={S.btn} onClick={handleSubmit}>
              Update Patient
            </button>
        </form>
        <Link to={`/home/${patientID}`}>
        <button className={S.btnBack}>
              Back
        </button>
        </Link>
      </div>
    </>
  );
}

export default addEvolution;
