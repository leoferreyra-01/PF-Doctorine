//|> EXPRESS ROUTER
const router = require('express').Router();
//|> EXPRESS-VALIDATOR
const { validateBudget } = require('../validators/validatorBudget');
const validate = require('../controllers/validators');
//|> CONTROLLER
const {
  getAllBudgets,
  getBudgetById,
  createBudget,
  putBudget,
} = require('../controllers/controllerBudgets/budgets');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', getAllBudgets);

router.get(
  '/:id',
  [validate.xModelID('Budget', 'id'), validate.xResults],
  getBudgetById
);

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', validateBudget, createBudget);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', validateBudget, putBudget);

//#endregion
module.exports = router;
