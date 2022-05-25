//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const { getTurns } = require('../controllers/GetTurn');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');

router.get('/', async (req, res) => {
  return res.json(await getTurns());
});

//#endregion

//#region <>-------------------- POST --------------------<>
// const {} = require('./controllersPOST');

router.post('/', async (req, res) => {});

//#endregion

//#region <>-------------------- PUT --------------------<>
// const {} = require('./controllersPUT');

router.put('/', async (req, res) => {});

//#endregion

//#region <>-------------------- DELETE --------------------<>
// const {} = require('./controllersDELETE');

router.delete('/', async (req, res) => {});

//#endregion

module.exports = router;
