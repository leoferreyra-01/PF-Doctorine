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
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get(
  '/:ID',
  [validate.xModelID('Patient', 'ID'), validate.xResults],
  async (req, res) => {
    const { ID } = req.params;

    // const [validation1, PatientID_Errors] = await validate.ModelID('Patient', ID);
    // const Errors = { PatientID_Errors };

    try {
      // if (!validation1) throw new Error('Validation failure.');

      res.status(200).json(await getPatientById(ID));
    } catch (error) {
      console.log(error);
      // console.log(Errors);
      // res.status(400).json(Errors);
      res.status(400).json(error);
    }
  }
);

//#endregion

//#region <>-------------------- POST --------------------<>

router.post(
  '/',
  [...validate.xInfoUser, ...validate.xInfoPatient, validate.xResults],
  async (req, res) => {
    const { infoUser, infoPatient } = req.body;

    // const [validation1, infoUser_Errors] = await validate.InfoUser(
    //   'POST',
    //   infoUser
    // );
    // const [validation2, infoPatient_Errors] = await validate.InfoPatient(
    //   'POST',
    //   infoPatient
    // );
    // const Errors = { infoUser_Errors, infoPatient_Errors };

    try {
      // if (!validation1 || !validation2) throw new Error('Validation failure.');

      res.status(200).json(await postPatient(infoUser, infoPatient));
    } catch (error) {
      console.log(error);
      // console.log(Errors);
      // res.status(400).json(Errors);
      res.status(400).json(error);
    }
  }
);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put(
  '/:ID',
  [
    validate.xModelID('Patient', 'ID'),
    ...validate.xInfoUser,
    ...validate.xInfoPatient,
    validate.xResults,
  ],
  async (req, res) => {
    const { ID } = req.params;
    const { infoUser, infoPatient } = req.body;

    // const [validation1, PatientID_Errors] = await validate.ModelID('Patient', ID);
    // const [validation2, infoUser_Errors] = await validate.InfoUser(
    //   'PUT',
    //   infoUser
    // );
    // const [validation3, infoPatient_Errors] = await validate.InfoPatient(
    //   'PUT',
    //   infoPatient
    // );
    // const Errors = { PatientID_Errors, infoUser_Errors, infoPatient_Errors };

    try {
      // if (!validation1 || !validation2 || !validation3)
      //   throw new Error('Validation failure.');

      res.status(200).json(await putPatient(ID, infoUser, infoPatient));
    } catch (error) {
      console.log(error);
      // console.log(Errors);
      // res.status(400).json(Errors);
      res.status(400).json(error);
    }
  }
);

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete(
  '/:ID',
  [validate.xModelID('Patient', 'ID'), validate.xResults],
  async (req, res) => {
    const { ID } = req.params;

    // const [validation1, PatientID_Errors] = await validate.ModelID('Patient', ID);
    // const Errors = { PatientID_Errors };

    try {
      // if (!validation1) throw new Error('Validation failure.');

      res.status(200).send(await deletePatient(ID));
    } catch (error) {
      console.log(error);
      // console.log(Errors);
      // res.status(400).json(Errors);
      res.status(400).json(error);
    }
  }
);

//#endregion

module.exports = router;
