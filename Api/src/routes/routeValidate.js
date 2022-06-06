//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const validate = require('../controllers/validators');

//|> RUTE

//#region <>-------------------- POST MEDIC --------------------<>

router.post(
  '/medic',
  [
    validate.xModelID('Clinic', 'ClinicID'),
    ...validate.xInfoUser,
    ...validate.xInfoMedic,
    validate.xResults,
  ],
  async (req, res) => {
    try {
      res.status(200).json([false, null]);
    } catch (error) {
      console.error(error);
      res.status(403).json([true, { error: { msg: error.message } }]);
    }
  }
);

//#endregion

//#region <>-------------------- POST PATIENT --------------------<>

router.post(
  '/patient',
  [...validate.xInfoUser, ...validate.xInfoPatient, validate.xResults],
  async (req, res) => {
    try {
      res.status(200).json([false, null]);
    } catch (error) {
      console.error(error);
      res.status(403).json([true, { error: { msg: error.message } }]);
    }
  }
);

//#endregion

//#region <>-------------------- PUT MEDIC --------------------<>

router.put(
  '/medic/:ID',
  [
    validate.xModelID('Medic', 'ID'),
    validate.xModelID('Clinic', 'ClinicID'),
    ...validate.xInfoUser,
    ...validate.xInfoMedic,
    validate.xResults,
  ],
  async (req, res) => {
    try {
      res.status(200).json([false, null]);
    } catch (error) {
      console.error(error);
      res.status(403).json([true, { error: { msg: error.message } }]);
    }
  }
);

//#endregion

//#region <>-------------------- PUT PATIENT --------------------<>

router.put(
  '/patient/:ID',
  [
    validate.xModelID('Patient', 'ID'),
    ...validate.xInfoUser,
    ...validate.xInfoPatient,
    validate.xResults,
  ],
  async (req, res) => {
    try {
      res.status(200).json([false, null]);
    } catch (error) {
      console.error(error);
      res.status(403).json([true, { error: { msg: error.message } }]);
    }
  }
);

//#endregion

module.exports = router;
