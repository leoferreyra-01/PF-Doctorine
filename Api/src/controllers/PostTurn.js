'use strict';

//|> SEQUELIZE

const { Medic, Patient, Turn } = require('../db');

//|> CONTROLLER

async function postTurns(req, res) {
  let { date, time, duration, description, medic, patient } = req.body;
  let createTurn = await Turn.create({
    date,
    time,
    duration,
    description,
  });
  let addMedics = await Medic.findOne({
    where: { title: medic }, // cambiar a seleccion de medico por nombre
  });
  await createTurn.setMedic(addMedics);

  let addPatients = await Patient.findOne({
    where: { ID: patient },
  });

  await createTurn.setPatient(addPatients);
  res.send('Turn Create');
  return createTurn;
}
module.exports = {
  postTurns,
};
