//|> EXPRESS ROUTER
const router = require('express').Router();


//|> CONTROLLERS
const {getTeeth} = require('../controllers/controllerTeeth/getTeeth');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/', async (req, res) => {
  try {
    const tooth = await getTeeth();
    if (!tooth) {
      return res.status(404).send('There are no tooth');
    }
    return res.json(tooth);
  } catch (e) {
    return res
      .status(500)
      .json({
        error: 'ERR_GET_TEETH',
        description: 'There was an error getting the Tooth',
        message: e.message,
      });
  }
});

module.exports = router;
