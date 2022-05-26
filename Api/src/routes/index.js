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

//|> /clinicalhistories
const ClinicalHistory = require('./routeClinicalHistory');
router.use('/clinicalhistories', ClinicalHistory);
module.exports = router;

//|> /clinics
const Clinics = require('./routerClinics');
router.use('/clinics', Clinics);

//|> /budgets
const Budget = require('./routerBudgets.js');
router.use('/budgets', Budget);

//|> /treatments
const Treatment = require('./routerTreatmensts');
router.use('/treatments', Treatment);

//|> /studies
const Study = require('./routerStudies');
router.use('/studies', Study);

//|> /evolutions
const getEvolution = require("./routeEvolutions");
router.use("/evolutions" , getEvolution)