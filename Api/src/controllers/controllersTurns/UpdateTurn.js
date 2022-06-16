'use strict';

//|> SEQUELIZE

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

async function updateTurns(req, res) {
  let { ID } = req.params;
  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    Turn.update(
      {
        time: req.body.time,
        description: req.body.description,
        date: req.body.date,
        duration: req.body.duration,
        medicAccepts: req.body.medicAccepts,
        patientAccepts: req.body.patientAccepts,
      },
      {
        where: {
          ID: ID,
        },
      }
    ).then(function (result) {
      res.json({
        status: 1,
        data: result,
      });
    });

    // //#region |> EMAIL
    // const turn = (await Turn.findOne({ where: { ID: ID } })).dataValues;
    // const medic = (
    //   await Medic.findOne({ where: { ID: turn.MedicID }, include: [User] })
    // ).dataValues;
    // const medicEmail = medic.User.dataValues.email;
    // const patient = (
    //   await Patient.findOne({ where: { ID: turn.PatientID }, include: [User] })
    // ).dataValues;
    // const patientEmail = patient.User.dataValues.email;

    // if (patient) {
    //   let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //       user: process.env.USER_ADMIN, // generated ethereal user
    //       pass: process.env.PASSWORD, // generated ethereal password
    //     },
    //   });
    //   transporter.verify().then(() => {
    //     console.log('Ready for send mails');
    //   });
    //   await transporter.sendMail({
    //     from: '"Turn Accepted" <doctorine.com@gmail.com>', // sender address
    //     to: `${patientEmail}, ${medicEmail}`, // list of receivers
    //     subject: `Turn accepted for ${req.body.date}`, // Subject line
    //     html: `<b>The doctor ${medic.User.dataValues.name} ${
    //       medic.User.dataValues.lastName
    //     } has accepted a Turn on ${req.body.date} at ${numberToHours(
    //       req.body.time
    //     )}hs.</b>`, // html body
    //   });
    // } else {
    //   res.json({ error: 'User not found!' });
    // }
    // //#endregion
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
}
module.exports = {
  updateTurns,
};
