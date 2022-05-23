'use strict';

//|> EXPRESS ROUTER
const router = require('express').Router();

//|> /medics
const Medic = require('./routeMedic');
router.use('/medics', Medic);

module.exports = router;
