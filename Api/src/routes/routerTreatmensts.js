//|> EXPRESS ROUTER
const router = require('express').Router();

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

router.post('/', createTreatment);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', putTreatment);

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:id', deleteTreatment);

//#endregion
module.exports = router;
