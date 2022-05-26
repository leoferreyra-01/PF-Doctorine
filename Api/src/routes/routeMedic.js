//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const { getMedic } = require('../controllers/getMedic');
const { postMedic } = require('../controllers/postMedic');
const { putMedic } = require('../controllers/putMedic');
const { deleteMedic } = require('../controllers/deleteMedic');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getMedic());
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    res.status(200).json(await getMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  const { infoUser, infoMedic, ClinicID } = req.body;

  try {
    res.status(200).send(await postMedic(infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoMedic, ClinicID } = req.body;

  try {
    res.status(200).send(await putMedic(ID, infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    res.status(200).send(await deleteMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

module.exports = router;
