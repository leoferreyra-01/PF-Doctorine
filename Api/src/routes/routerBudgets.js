//|> EXPRESS ROUTER
const router = require('express').Router();
//|> EXPRESS-VALIDATOR
const { validateBudget } = require('../validators/validatorBudget');

//|> CONTROLLER
const {
  getAllBudgets,
  getBudgetById,
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

router.post('/', validateBudget, createBudget);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', validateBudget, putBudget);
//#endregion
module.exports = router;
