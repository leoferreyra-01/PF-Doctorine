'use strict';

//|> SEQUELIZE

const { Medic, Patient, ClinicalHistory } = require('../../db');

//|> CONTROLLER

async function postClinicalHistory(req, res) {
  let {
    b_smoker,
    b_useDrugs,
    b_pregnant,
    b_takeMedicine,
    b_sufferedFromIllness,
    b_alergicToMedicine,
    b_normalWoundHealing,
    b_other,
    ic_anginaPectoris,
    ic_myocardialInfarction,
    ic_hypertension,
    ic_vascularAffections,
    ic_other,
    ih_anemia,
    ih_leukemia,
    ih_haemophilia,
    ih_alterationWhiteSerie,
    ih_other,
    ir_asthma,
    ir_pulmonaryEdema,
    ir_ephysemia,
    ir_tuberculosis,
    ir_chronicBronchitis,
    ir_other,
    ig_ulcer,
    ig_hepatitis,
    ig_cirrohsis,
    ig_other,
    in_epilepsy,
    in_useOfTranquilizers,
    in_seizures,
    in_other,
    ib_osteoporosis,
    ib_paget,
    ib_rickets,
    ib_osteomalacia,
    ib_other,
    medic,
    patient,
  } = req.body;
  let createHistoryClinic = await ClinicalHistory.create({
    b_smoker,
    b_useDrugs,
    b_pregnant,
    b_takeMedicine,
    b_sufferedFromIllness,
    b_alergicToMedicine,
    b_normalWoundHealing,
    b_other,
    ic_anginaPectoris,
    ic_myocardialInfarction,
    ic_hypertension,
    ic_vascularAffections,
    ic_other,
    ih_anemia,
    ih_leukemia,
    ih_haemophilia,
    ih_alterationWhiteSerie,
    ih_other,
    ir_asthma,
    ir_pulmonaryEdema,
    ir_ephysemia,
    ir_tuberculosis,
    ir_chronicBronchitis,
    ir_other,
    ig_ulcer,
    ig_hepatitis,
    ig_cirrohsis,
    ig_other,
    in_epilepsy,
    in_useOfTranquilizers,
    in_seizures,
    in_other,
    ib_osteoporosis,
    ib_paget,
    ib_rickets,
    ib_osteomalacia,
    ib_other,
  });

  let addPatients = await Patient.findOne({
    where: { ID: parseInt(patient) },
  });

  await createHistoryClinic.setPatient(addPatients);
  res.send('History Clinic Create');
  return createHistoryClinic;
}
module.exports = {
  postClinicalHistory,
};
