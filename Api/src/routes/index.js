'use strict';
//|> EXPRESS ROUTER
const router = require('express').Router();

//|> /sql
const SQL = require('./routeSQL');
router.use('/sql', SQL);

//|> /medics
const Medic = require('./routeMedic');
router.use('/medics', Medic);

//|> /patients
const Patient = require('./routerPatient');
router.use('/patients', Patient);

//|> /turns
const Turns = require('./routerturns');
router.use('/turns', Turns);

//|> /historyclinics
const ClinicalHistory = require('./routeClinicalHistory');
router.use('/clinicalhistory', ClinicalHistory);
module.exports = router;

//|> /clinics(Laura)
const Clinics = require('./routerClinics');
router.use('/Clinics', Clinics);

//|> /budgets(Laura)
const Budget = require('./routerBudgets.js');
router.use('/budgets', Budget);

//|> /treatments(Laura)
const Treatment = require('./routerTreatmensts');
router.use('/treatments', Treatment);
