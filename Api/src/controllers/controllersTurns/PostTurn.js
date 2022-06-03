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
    if (!medic)
      return res
        .status(400)
        .send({ error: 'Incomplete data or there is a medioc not found' });
    if (!time)
      return res
        .status(400)
        .send({ error: 'incomplete data or there is an error in the time' });
    const createTurn = await Turn.create({
      date,
      time,
      duration,
      description,
    });

    // set medic and patient by id
    await createTurn.setMedic(medic);
    await createTurn.setPatient(patient);

    const newTurn = await Turn.findByPk(createTurn.ID, {
      include: [Medic, Patient],
    });

    res.status(200).json(newTurn);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}
module.exports = {
  postTurns,
};
