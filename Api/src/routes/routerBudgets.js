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

router.get('/', async (req, res) => {
  try {
    // se puede recibir por query
    const { PatientID } = req.query;

    if (PatientID) {
      let BudgetByPatient = await getBudgetByPatient(PatientID);
      return res.status(200).json(BudgetByPatient);
    }
    let allBudgets = await getAllBudgets();
    return res.status(200).json(allBudgets);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    let Budget = await getBudgetById(id);
    res.status(200).json(Budget);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  try {
    await createBudget(req.body);
    res.status(201).json({ msg: 'successfully created budget' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', async (req, res) => {
  try {
    await putBudget(req.body);
    res.status(201).json({ msg: 'budget paid successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/', async (req, res) => {});

//#endregion
module.exports = router;
