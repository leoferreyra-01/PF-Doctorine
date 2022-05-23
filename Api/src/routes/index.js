'use strict';

//|> EXPRESS ROUTER
const router = require('express').Router();

//|> /sql
const SQL = require('./routeSQL');
router.use('/sql', SQL);

//|> /medics
const Medic = require('./routeMedic');
router.use('/medics', Medic);

module.exports = router;
