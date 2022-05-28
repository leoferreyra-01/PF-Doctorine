//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const {
  getEvolution,
  getEvolutionID,
  getEvolutionPatient,
} = require('../controllers/controllerEvolutions/getEvolution');
const {
  postEvolution,
} = require('../controllers/controllerEvolutions/postEvolution');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  const { PatientID } = req.query;
  try {
    if (PatientID) {
      return res.json(await getEvolutionPatient(PatientID));
    }
    return res.json(await getEvolution());
  } catch (e) {
    res.json({
      error: 'ERR_GET_EVO_G',
      description: 'There was an error getting the Evolutions',
      message: e.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await getEvolutionID(id));
  } catch (e) {
    res.json({
      error: 'ERR_GET_EVO_ID',
      description: 'There was an error getting the Evolution',
      message: e.message
    });
  }
});

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  try {
    res.json(await postEvolution(req.body));
  } catch (e) {
    res.json({
      error: 'ERR_CRT_EVO',
      description: 'The was a problem creating the Evolution',
      message: e.message
    });
  }
});

//#endregion

module.exports = router;

// //|> /evolutions
// const getEvolution = require("./routeEvolutions");
// router.use("/evolutions" , getEvolution)
