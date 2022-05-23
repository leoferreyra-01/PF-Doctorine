'use strict';
//|> EXPRESS ROUTER
const router = require('express').Router();

//|> /medics
const Medic = require('./routerMedic');
router.use('/medics', Medic);

//|> /turns
const Turns = require('./routerturns');
router.use('/turns', Turns);
module.exports = router;
