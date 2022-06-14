'use strict';

//|> SEQUELIZE
var moment = require('moment');
const { Medic, Patient, Turn, User } = require('../../db');
var nodemailer = require('nodemailer');

//|> CONTROLLER

function numberToHours(number) {
  let hours = Math.floor(number);
  let minutes = Math.round((number - hours) * 60);

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}

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
      email,
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

    //|> EMAIL
    const medic = (await Medic.findOne({where: {ID: MedicID}, include: [User]})).dataValues;
    console.log(medic);
    const medicEmail = medic.User.dataValues.email;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USER_ADMIN, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });
      transporter.verify().then(() => {
        console.log('Ready for send mails');
      });
      await transporter.sendMail({
        from: '"Turn Created" <doctorine.com@gmail.com>', // sender address
        to: `${email}, ${medicEmail}`, // list of receivers
        subject: `Turn created for ${date}`, // Subject line
        html: `<b>The doctor ${medic.User.dataValues.name} ${medic.User.dataValues.lastName} has created a Turn on ${date} at ${numberToHours(time)}hs.</b>`, // html body
      });
    } else {
      res.json({ error: 'User not found!' });
    }
    //#endregion

    res.status(200).json(newTurn);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}
module.exports = {
  postTurns,
};
