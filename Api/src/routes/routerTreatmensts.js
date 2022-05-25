//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const {
  getAllTreatments,
  getTreatmentById,
  createTreatment,
  putTreatment,
  deleteTreatment,
} = require('../controllers/treatmenst');

//|> RUTE

//#region <>-------------------- GET --------------------<>
// const {} = require('./controllersGET');

router.get('/', async (req, res) => {
  try {
    let allTreatments = await getAllTreatments();
    return res.status(200).json(allTreatments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    let Treatment = await getTreatmentById(id);
    res.status(200).json(Treatment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//#endregion
//#region <>-------------------- POST --------------------<>

router.post('/', async (req, res) => {
  try {
    await createTreatment(req.body);
    res.status(201).json({ msg: 'successfully created Treatment' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//#endregion

//#region <>-------------------- PUT --------------------<>

router.put('/', async (req, res) => {
  try {
    await putTreatment(req.body);
    res.status(201).json({ msg: 'Successfully updated treatment' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//#endregion

//#region <>-------------------- DELETE --------------------<>

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTreatment(id);
    res.status(201).json({ msg: 'Successfully removed treatment' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//#endregion
module.exports = router;
