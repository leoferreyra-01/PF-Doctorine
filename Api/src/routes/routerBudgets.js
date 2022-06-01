//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const {
  getAllBudgets,
  getBudgetById,
  getBudgetByPatient,
  createBudget,
  putBudget,
} = require('../controllers/controllerBudgets/budgets');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');

router.get('/', getAllBudgets);

router.get('/:id', getBudgetById);

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', createBudget);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', putBudget);
//#endregion
module.exports = router;
