const express = require('express');
const router = express.Router();
const { User } = require('../../db');

const {
  newPassword,
  passwordReset,
  newPasswordReset,
  checkPassword
} = require('../../controllers/controllerLogin/postUserPassword');

router.put('/update', async (req, res) => {
  try {
    const result = await newPassword(req.body);
    console.log(result);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      error: 'ERR_UPD_PSW',
      description: 'The was a problem updating the password',
      message: error.message,
    });
  }
});

router.put('/reupdate', async (req, res) => {
  try {
    const result = await newPasswordReset(req.body);
    console.log(result);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      error: 'ERR_UPD_PSW',
      description: 'The was a problem updating the password',
      message: error.message,
    });
  }
});

router.post('/check', async (req, res) => {
  try {
    const result = await checkPassword(req.body);
    console.log(result);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      error: 'ERR_UPD_PSW',
      description: 'The was a problem updating the password',
      message: error.message,
    });
  }
})

router.post('/reset', async(req, res) => {
  try {
    const result = await passwordReset(req.body);
    console.log(result);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      error: 'ERR_UPD_PSW',
      description: 'The was a problem updating the password',
      message: error.message,
    });
  }
});

module.exports = router;

// const passwordChange = require("./routesLogin/routePassword")
// router.use("/password", passwordChange)
