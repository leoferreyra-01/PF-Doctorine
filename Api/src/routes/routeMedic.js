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
    res.status(200).json(await getMedic(null, req.query));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

router.get('/:ID', validate.GET.Medic, async (req, res) => {
  const { ID } = req.params;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).json(await getMedic(ID));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', validate.POST.Medic, async (req, res) => {
  const { infoUser, infoMedic, ClinicID } = req.body;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).json(await postMedic(infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', validate.PUT.Medic, async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoMedic, ClinicID } = req.body;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).json(await putMedic(ID, infoUser, infoMedic, ClinicID));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', validate.DELETE.Medic, async (req, res) => {
  const { ID } = req.params;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).send(await deleteMedic(ID));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

module.exports = router;
