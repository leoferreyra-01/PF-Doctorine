'use strict';

//|> SEQUELIZE

const { ClinicalHistory, Patient, Study } = require('../../db');

//|> CONTROLLER

async function postStudy(req, res) {
  let { studyType, description, attach, medic, patient, historyclinic } =
    req.body; //|!| deberia recibir un medico
  let createStudy = await Study.create({
    studyType,
    description,
    attach,
    patient,
    // historyclinic,
  });

  let addPatients = await Patient.findOne({
    where: { ID: patient },
  });
  await createStudy.setPatient(addPatients);

  // let addHc = await ClinicalHistory.findOne({
  //   where: { ID: patient },
  // });
  // await createStudy.setClinicalHistory(addHc);
  res.send('Study Create');
  return createStudy;
}
module.exports = {
  postStudy,
};
