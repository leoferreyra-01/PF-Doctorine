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

  const [validation1, MedicID_Errors] = await validate.ModelID('Medic', ID);
  const Errors = { MedicID_Errors };

  try {
    if (!validation1) throw new Error('Validation failure.');

    res.status(200).json(await getMedic(ID));
  } catch (error) {
    console.log(error);
    console.log(Errors);
    res.status(400).json(Errors);
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  const { infoUser, infoMedic, ClinicID } = req.body;

  const [validation1, infoUser_Errors] = await validate.InfoUser(
    'POST',
    infoUser
  );
  const [validation2, infoMedic_Errors] = await validate.InfoMedic(
    'POST',
    infoMedic
  );
  const Errors = { infoUser_Errors, infoMedic_Errors };

  try {
    if (!validation1 || !validation2) throw new Error('Validation failure.');

    res.status(200).json(await postMedic(infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    console.log(Errors);
    res.status(400).json(Errors);
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoMedic, ClinicID } = req.body;

  const [validation1, MedicID_Errors] = await validate.ModelID('Medic', ID);
  const [validation2, infoUser_Errors] = await validate.InfoUser(
    'POST',
    infoUser
  );
  const [validation3, infoMedic_Errors] = await validate.InfoMedic(
    'POST',
    infoMedic
  );
  const Errors = { MedicID_Errors, infoUser_Errors, infoMedic_Errors };

  try {
    if (!validation1 || !validation2 || !validation3)
      throw new Error('Validation failure.');

    res.status(200).json(await putMedic(ID, infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.log(error);
    console.log(Errors);
    res.status(400).json(Errors);
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  const [validation1, MedicID_Errors] = await validate.ModelID('Medic', ID);
  const Errors = { MedicID_Errors };

  try {
    if (!validation1) throw new Error('Validation failure.');

    res.status(200).send(await deleteMedic(ID));
  } catch (error) {
    console.log(error);
    console.log(Errors);
    res.status(400).json(Errors);
  }
});

//#endregion

module.exports = router;
