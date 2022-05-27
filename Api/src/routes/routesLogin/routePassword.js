const express = require('express');
const router = express.Router();

const {
  newPassword,
  passwordReset,
} = require('../../controllers/controllerLogin/postUserPassword');
router.post('/update', newPassword);

router.post('/reset', passwordReset);

module.exports = router

// const passwordChange = require("./routesLogin/routePassword")
// router.use("/password", passwordChange)