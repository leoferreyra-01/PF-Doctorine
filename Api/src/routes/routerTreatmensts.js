//|> EXPRESS ROUTER
const router = require('express').Router();
//|> EXPRESS-VALIDATOR
const { validateTreatments } = require('../validators/validatorTreatments');
const validate = require('../controllers/validators');
//|> CONTROLLER
const {
  getAllTreatments,
  getTreatmentById,
  createTreatment,
  putTreatment,
  deleteTreatment,
} = require('../controllers/controllerTreatments/treatmenst');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', getAllTreatments);

router.get(
  '/:id',
  [validate.xModelID('Treatment', 'id'), validate.xResults],
  getTreatmentById
);

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', validateTreatments, createTreatment);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', validateTreatments, putTreatment);

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:ID', validateTreatments, deleteTreatment);

//#endregion
module.exports = router;
