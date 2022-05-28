//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const { getMedic } = require('../controllers/controllersMedics/getMedic');
const { postMedic } = require('../controllers/controllersMedics/postMedic');
const { putMedic } = require('../controllers/controllersMedics/putMedic');
const { deleteMedic } = require('../controllers/controllersMedics/deleteMedic');

const validate = require('../controllers/validators');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getMedic());
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    await validate.ModelID('Medic', ID);
    res.status(200).json(await getMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  const { infoUser, infoMedic, ClinicID } = req.body;

  try {
    await validate.InfoUser('POST', infoUser);
    await validate.InfoMedic('POST', infoMedic);
    res.status(200).json(await postMedic(infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoMedic, ClinicID } = req.body;

  try {
    await validate.InfoUser('PUT', infoUser);
    await validate.InfoMedic('PUT', infoMedic);
    await validate.ModelID('Medic', ID);
    await validate.ModelID('Clinic', ClinicID);
    res.status(200).json(await putMedic(ID, infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  try {
    await validate.ModelID('Medic', ID);
    res.status(200).send(await deleteMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
});

//#endregion

module.exports = router;
