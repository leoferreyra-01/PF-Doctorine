const express = require("express");
const router = express.Router();

const { passwordReset } = require("../controllers/passwordReset.controllers")

router.post("/", passwordReset);

module.exports = router;