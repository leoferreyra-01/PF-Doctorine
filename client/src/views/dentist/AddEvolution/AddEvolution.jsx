import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelect } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { getMedics, getTreatments } from "../../../redux/actions";

export function validate(input) {}

function addEvolution() {
  const { patientID } = useParams();
  const tratamientos = useSelector((state) => state.treatments);
  const medicos = useSelector((state) => state.medics);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    Observations: "",
    medico: [],
    fecha: "",
    tratamiento: [],
  });

  function handleSelect(e) {
    if (data.tratamiento.includes(e.target.value)) {
      alert(`The treatment ${e.target.value} has already been selected`);
    } else {
      setData({
        ...data,
        tratamiento: [...data.tratamiento, e.target.value],
      });
    }
  }

  function handleSelectMedic(e) {
    if (data.medico.length > 1) {
      alert("Only one medic can be selected");
    } else {
      setData({
        ...data,
        medico: e.target.value,
      });
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setData({
      ...data,
      tratamiento: data.tratamiento.filter((t) => t !== e.target.name),
    });
  }

  useEffect(() => {
    dispatch(getTreatments());
    dispatch(getMedics());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <form>
        {/* {errors.passwordConfirm && (
              <p className="error">{errors.passwordConfirm}</p>
            )} */}
        <label>Observations</label>
        <input
          value={data.sintomas}
          placeholder="Observations"
          type="text"
          name="Observations"
        />

        <label>Date</label>
        <input
          value={data.fecha}
          placeholder="Observations"
          type="date"
          name="Observations"
        />

        <select onChange={(e) => handleSelectMedic(e)} name="treatments">
          <option hidden value="">
            Select Medic
          </option>
          {medicos &&
            medicos.map((medicos) => (
              <option
                value={medicos.fullName}
              >{`${medicos.fullName}`}</option>
            ))}
        </select>

        <select onChange={(e) => handleSelect(e)} name="medic">
          <option hidden value="">
            Select Treatment
          </option>
          {tratamientos &&
            tratamientos.map((tratemientos) => (
              <option
                value={tratemientos.ID}
              >{`${tratemientos.description}(${tratemientos.treatmentType})`}</option>
            ))}
        </select>
        {data.tratamiento.length > 0 && (
          <div>
            <h4>Selected Treatments</h4>
            <hr />
            <ul>
              {data.tratamiento.map((t) => {
                let treat = tratamientos.map((tr) =>
                tr.ID === t ? tr.description : null
              );
              console.log(treat);
                return (
                  <li key={t.ID}>
                    <button onClick={(e) => handleDelete(e)} name={t}>
                      ❌
                    </button>
                    {treat}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button type="submit">Add Evolution</button>
      </form>
    </>
  );
}

export default addEvolution;
