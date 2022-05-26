//|> EXPRESS ROUTER
const router = require('express').Router();

const { request } = require('express');
//|> CONTROLLER
const { getTurns, getTurnsid, getTurnsidP } = require('../controllers/GetTurn');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');
router.get('/', async (req, res) => {
  return res.json(await getTurns());
});

router.get('/search', async (req, res) => {
  const { id } = req.query;
  return res.json(await getTurnsidP(id));
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
const { deleteTurns } = require('../controllers/DeleteTurn');

router.delete('/delete/:id', deleteTurns);

//#endregion

module.exports = router;
