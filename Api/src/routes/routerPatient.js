//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const {
  getPatients,
  getPatientById,
} = require('../controllers/controllersPatients/getPatient');
const {
  postPatient,
} = require('../controllers/controllersPatients/postPatient');
const { putPatient } = require('../controllers/controllersPatients/putPatient');
const {
  deletePatient,
} = require('../controllers/controllersPatients/deletePatient');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getPatients(req.query));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    res.status(200).json(await getPatientById(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  const { infoUser, infoPatient } = req.body;

  try {
    validateInfoUser(infoUser);
    res.status(200).send(await postPatient(infoUser, infoPatient));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoPatient } = req.body;

  try {
    res.status(200).send(await putPatient(ID, infoUser, infoPatient));
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
    res.status(200).send(await deletePatient(ID));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

module.exports = router;
