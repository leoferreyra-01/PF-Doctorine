//|> EXPRESS ROUTER
const router = require('express').Router();
//|> EXPRESS-VALIDATOR
const { validateTreatments } = require('../validators/validatorTreatments');

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
// const {} = require('./controllersGET');

router.get('/', getAllTreatments);

router.get('/:id', getTreatmentById);

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', validateTreatments, createTreatment);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', validateTreatments, putTreatment);

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:id', validateTreatments, deleteTreatment);

//#endregion
module.exports = router;
