'use strict';

//|> SEQUELIZE
var moment = require('moment');
const { Medic, Patient, Turn } = require('../../db');

//|> CONTROLLER

async function postTurns(req, res) {
  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    let {
      date,
      time,
      duration,
      description,
      medicAccepts,
      patientAccepts,
      MedicID,
      PatientID,
    } = req.body;

    if (!date || moment(date, 'YYYY-MM-DD', true).isValid() === false)
      return res
        .status(400)
        .send({ error: 'incomplete data or there is an error in the date' });
    if (!PatientID)
      return res
        .status(400)
        .send({ error: 'Incomplete data or there is a patient not found' });
    if (!MedicID)
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
      medicAccepts,
      patientAccepts,
    });

    // set MedicID and PatientID by id
    await createTurn.setMedic(MedicID);
    await createTurn.setPatient(PatientID);

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
