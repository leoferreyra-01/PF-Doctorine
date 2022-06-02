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

router.get(
  '/:ID',
  [validate.xModelID('Medic', 'ID'), validate.xResults],
  async (req, res) => {
    const { ID } = req.params;

    try {
      res.status(200).json(await getMedic(ID));
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

//#endregion

//#region <>-------------------- POST --------------------<>

router.post(
  '/',
  [
    validate.xModelID('Clinic', 'ClinicID'),
    ...validate.xInfoUser,
    ...validate.xInfoMedic,
    validate.xResults,
  ],
  async (req, res) => {
    const { infoUser, infoMedic, ClinicID } = req.body;

    try {
      res.status(200).json(await postMedic(infoUser, infoMedic, ClinicID));
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put(
  '/:ID',
  [
    validate.xModelID('Medic', 'ID'),
    validate.xModelID('Clinic', 'ClinicID'),
    ...validate.xInfoUser,
    ...validate.xInfoMedic,
    validate.xResults,
  ],
  async (req, res) => {
    const { ID } = req.params;
    const { infoUser, infoMedic, ClinicID } = req.body;

    try {
      res.status(200).json(await putMedic(ID, infoUser, infoMedic, ClinicID));
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', [validate.xModelID('Medic', 'ID')], async (req, res) => {
  const { ID } = req.params;

  try {
    res.status(200).send(await deleteMedic(ID));
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//#endregion

module.exports = router;
