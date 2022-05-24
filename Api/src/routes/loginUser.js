const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/loginUser.controllers")

router.post("/", loginUser);

module.exports = router;

// const loginUser = require("./loginUser") 
// router.use("/login" , loginUser) 