//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const { getHistoryClinic } = require('../controllers/GetHistoryClinics');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  return res.json(await getHistoryClinic());
});
const {
  getHistoryClinicId,
  getHistoryClinicPId,
} = require('../controllers/GetHistoryClinics');

router.get('/search', async (req, res) => {
  return res.json(await getHistoryClinicId((ID = req.query.id)));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await getHistoryClinicId(id));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await getHistoryClinicPId(id));
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
