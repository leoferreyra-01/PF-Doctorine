'use strict';

//|> SEQUELIZE
var moment = require('moment');
const { Medic, Patient, Turn } = require('../../db');

//|> CONTROLLER

async function postTurns(req, res) {
  try {
    let { date, time, duration, description, medic, patient } = req.body;

    if (!date || moment(date, 'YYYY-MM-DD', true).isValid() === false)
      return res
        .status(400)
        .send({ error: 'incomplete data or there is an error in the date' });
    if (!patient)
      return res
        .status(400)
        .send({ error: 'Incomplete data or there is a patient not found' });
    if (!time)
      return res
        .status(400)
        .send({ error: 'incomplete data or there is an error in the time' });
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
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  postTurns,
};
