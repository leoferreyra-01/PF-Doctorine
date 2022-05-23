//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const { getMedic } = require('../controllers/getMedic');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');

router.get('/', async (req, res) => {
  // getMedic()
});

module.exports = router;
