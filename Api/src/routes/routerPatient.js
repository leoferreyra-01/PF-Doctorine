//|> EXPRESS ROUTER
const router = require('express').Router();

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

const validate = require('../controllers/validators');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await getPatients(req.query));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

router.get('/:ID', validate.GET.Patient, async (req, res) => {
  const { ID } = req.params;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).json(await getPatientById(ID));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', validate.POST.Patient, async (req, res) => {
  const { infoUser, infoPatient } = req.body;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).json(await postPatient(infoUser, infoPatient));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/:ID', validate.PUT.Patient, async (req, res) => {
  const { ID } = req.params;
  const { infoUser, infoPatient } = req.body;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).json(await putPatient(ID, infoUser, infoPatient));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', validate.DELETE.Patient, async (req, res) => {
  const { ID } = req.params;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    res.status(200).send(await deletePatient(ID));
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

module.exports = router;
