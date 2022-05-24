//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const { getMedic } = require('../controllers/getMedic');
const { postMedic } = require('../controllers/postMedic');

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

router.post('/', async (req, res) => {
  const { infoUser, infoMedic, ClinicID } = req.body;

  try {
    await postMedic(infoUser, infoMedic, ClinicID);

    res.status(200).send('Medic created');
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

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
