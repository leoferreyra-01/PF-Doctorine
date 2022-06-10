'use strict';
//|> EXPRESS ROUTER
const router = require('express').Router();
const path = require('path');

//|> Doctorine API
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

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
const getEvolution = require('./routeEvolutions');
router.use('/evolutions', getEvolution);

//|> /login
const usersChange = require('./routesLogin/routeLogin');
router.use('/login', usersChange);

//|> /password
const passwordChange = require('./routesLogin/routePassword');
router.use('/password', passwordChange);

//|> /tooth
const tooth = require('./routeTeeth');
router.use('/tooth', tooth);

//|> /mercadoPago
const mercadoPago = require('../MercadoPago/configmp');
router.use('/payments', mercadoPago);

module.exports = router;
