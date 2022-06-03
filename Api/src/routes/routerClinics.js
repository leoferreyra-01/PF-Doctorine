//|> EXPRESS ROUTER
const router = require('express').Router();
//|> EXPRESS-VALIDATOR
const { validateClinic } = require('../validators/validatorClinic');
const validate = require('../controllers/validators');
//|> CONTROLLER
const {
  getAllClinics,
  getClinicById,
  createClinic,
  putClinic,
} = require('../controllers/controllerClinics/clinic');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', getAllClinics);

router.get(
  '/:id',
  [validate.xModelID('Clinic', 'id'), validate.xResults],
  getClinicById
);

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', validateClinic, createClinic);

//#endregion

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', validateClinic, putClinic);

//#endregion
module.exports = router;
