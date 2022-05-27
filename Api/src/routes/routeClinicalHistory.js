//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const {
  getHistoryClinic,
} = require('../controllers/controllersHistoryClinics/GetHistoryClinics');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  return res.json(await getHistoryClinic());
});
const {
  getHistoryClinicId,
  getHistoryClinicPId,
} = require('../controllers/controllersHistoryClinics/GetHistoryClinics');

router.get('/search', async (req, res) => {
  return res.json(await getHistoryClinicPId((id = req.query.id)));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await getHistoryClinicId(id));
});

//#endregion

//#region <>-------------------- POST --------------------<>
const {
  postClinicalHistory,
} = require('../controllers/controllersHistoryClinics/PostHistoryClinic');

router.post('/', postClinicalHistory);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', async (req, res) => {});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/', async (req, res) => {});

//#endregion

module.exports = router;
