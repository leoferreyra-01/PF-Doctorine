//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLERS
const {
  getStudies,
  getStudiesId,
  getStudiesIdP,
} = require('../controllers/controllersStudies/getStudies');
const { postStudy } = require('../controllers/controllersStudies/PostStudy');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  return res.json(await getStudies());
});
router.get('/search', getStudiesIdP);

router.get('/:id', getStudiesId);

//#endregion

//#region <>-------------------- POST --------------------<>

router.post('/', postStudy);

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', async (req, res) => {});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/', async (req, res) => {});

//#endregion

module.exports = router;
