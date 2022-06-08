//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const validate = require('../controllers/validators');

//|> RUTE

//#region <>-------------------- POST MEDIC --------------------<>

router.post('/medic', validate.POST.Medic, async (req, res) => {
  try {
    res.status(200).json([false, null]);
  } catch (error) {
    console.error(error);
    res.status(403).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- POST PATIENT --------------------<>

router.post('/patient', validate.POST.Patient, async (req, res) => {
  try {
    res.status(200).json([false, null]);
  } catch (error) {
    console.error(error);
    res.status(403).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- PUT MEDIC --------------------<>

router.put('/medic/:ID', validate.PUT.Medic, async (req, res) => {
  try {
    res.status(200).json([false, null]);
  } catch (error) {
    console.error(error);
    res.status(403).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

//#region <>-------------------- PUT PATIENT --------------------<>

router.put('/patient/:ID', validate.PUT.Patient, async (req, res) => {
  try {
    res.status(200).json([false, null]);
  } catch (error) {
    console.error(error);
    res.status(403).json([true, { error: { msg: error.message } }]);
  }
});

//#endregion

module.exports = router;
