//|> EXPRESS ROUTER
const router = require('express').Router();

//|> CONTROLLER
const { getSQL } = require('../controllers/controllerSQL');

//|> RUTE

//#region <>-------------------- GET --------------------<>

router.get('/:sql', async (req, res) => {
  const { sql } = req.params;

  try {
    res.status(200).json(await getSQL(sql));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//#endregion

module.exports = router;
