'use strict';

//|> SEQUELIZE

const { Medic, Patient, Study } = require('../db');

//|> CONTROLLER

async function postStudy(req, res) {
  let { studyType, description, attach, medic, patient } = req.body; //|!| deberia recibir un medico
  let createStudy = await Study.create({
    studyType,
    description,
    attach,
    patient,
  });

  let addPatients = await Patient.findOne({
    where: { ID: patient },
  });

  await createStudy.setPatient(addPatients);
  res.send('Study Create');
  return createStudy;
}
module.exports = {
  postStudy,
};
