//|> EXPRESS ROUTER
const router = require('express').Router();

const { request } = require('express');
//|> CONTROLLER
const { getTurns, getTurnsid } = require('../controllers/GetTurn');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');
router.get('/', async (req, res) => {
  return res.json(await getTurns());
});

router.get('/search', async (req, res) => {
  const { UserId } = req.query;
  return res.json(await getTurnsid(UserId));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await getTurnsid(id));
});

//#endregion

//#region <>-------------------- POST --------------------<>
const { postTurns } = require('../controllers/PostTurn');

router.post('/', postTurns);

//#endregion

//#region <>-------------------- PUT --------------------<>
const { updateTurns } = require('../controllers/UpdateTurn');
router.put('/update/:id', updateTurns);

//#endregion

//#region <>-------------------- DELETE --------------------<>
// const {} = require('./controllersDELETE');

router.delete('/', async (req, res) => {});

//#endregion

module.exports = router;
