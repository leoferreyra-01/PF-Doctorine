//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const { getMedic } = require('../controllers/getMedic');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    res.status(200).json(await getMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getMedic());
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
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
