//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const { getEvolution } = require('../controllers/getEvolution');
const { getEvolutionID } = require('../controllers/getEvolution');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  return res.json(await getEvolution());
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await getEvolutionID(id));
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', async (req, res) => {});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/', async (req, res) => {});

//#endregion

module.exports = router;

// //|> /oneUser
// const getEvolution = require("./evolutions");
// router.use("/evolutions" , getEvolution)
