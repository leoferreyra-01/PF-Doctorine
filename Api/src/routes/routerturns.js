//|> EXPRESS ROUTER
const router = require('express').Router();

const { request } = require('express');
//|> CONTROLLER
const {
  getTurns,
  getTurnsid,
  getTurnsidP,
} = require('../controllers/controllersTurns/GetTurn');

const validate = require('../controllers/validators');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');
router.get('/', async (req, res) => {
  return res.json(await getTurns());
});

router.get('/search', validate.GET.Turn_PatientID, async (req, res) => {
  const { ID } = req.query;
  return res.json(await getTurnsidP(ID));
});

router.get('/:ID', validate.GET.Turn, async (req, res) => {
  const { ID } = req.params;
  return res.json(await getTurnsid(ID));
});

//#endregion

//#region <>-------------------- POST --------------------<>
const { postTurns } = require('../controllers/controllersTurns/PostTurn');

router.post('/', validate.POST.Turn, postTurns);

//#endregion

//#region <>-------------------- PUT --------------------<>
const { updateTurns } = require('../controllers/controllersTurns/UpdateTurn');
router.put('/update/:ID', validate.PUT.Turn, updateTurns);

//#endregion

//#region <>-------------------- DELETE --------------------<>
const { deleteTurns } = require('../controllers/controllersTurns/DeleteTurn');

router.delete('/delete/:ID', validate.DELETE.Turn, deleteTurns);

//#endregion

module.exports = router;
