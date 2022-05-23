'use strict';

//|> EXPRESS ROUTER
const router = require('express').Router();

//|> /medics
const Medic = require('./routerMedic');
router.use('/medics', Medic);

module.exports = router;
