const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/registerUser.controllers")

router.post("/", registerUser);

module.exports = router;

// const registerUser = require("./registerUser")
// router.use("/register", registerUser) 