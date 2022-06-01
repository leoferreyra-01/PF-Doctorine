//|> EXPRESS ROUTER
const router = require('express').Router();
const { validateClinic } = require('../validators/validatorClinic');
//|> CONTROLLER
const {
  getAllClinics,
  getClinicById,
  createClinic,
  putClinic,
} = require('../controllers/controllerClinics/clinic');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');

router.get('/', getAllClinics);

router.get('/:id', getClinicById);

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', validateClinic, createClinic);

//#endregion

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', putClinic);

//#endregion
module.exports = router;
