const express = require("express");
const router = express.Router();

const { userExist } = require("../controllers/userExist.controllers")

router.post("/", userExist);

module.exports = router;

// const userExist = require("./userExist");
// router.use("/oneUser" , userExist)