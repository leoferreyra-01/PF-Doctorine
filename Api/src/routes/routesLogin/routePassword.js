const express = require('express');
const router = express.Router();
const { User } = require('../../db');

const {
  newPassword,
  passwordReset,
  checkCurrentPassword
} = require('../../controllers/controllerLogin/postUserPassword');

router.post('/update', async (req, res) => {
  try {
    const result = await newPassword(req.body);
    console.log(result)
    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      error: 'ERR_UPD_PSW',
      description: 'The was a problem updating the password',
      message: error.message,
    });
  }
});

router.post('/reset', passwordReset);

module.exports = router;

// const passwordChange = require("./routesLogin/routePassword")
// router.use("/password", passwordChange)
