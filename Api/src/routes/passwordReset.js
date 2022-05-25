const express = require("express");
const router = express.Router();

const { passwordReset } = require("../controllers/passwordReset.controllers")

router.post("/", passwordReset);

module.exports = router;

// const passwordReset = require("./passwordReset") 
// router.use("/passwordReset", passwordReset) 