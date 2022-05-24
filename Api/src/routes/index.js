'use strict';
//|> EXPRESS ROUTER
const router = require('express').Router();

//|> /sql
const SQL = require('./routeSQL');
router.use('/sql', SQL);

//|> /medics
const Medic = require('./routeMedic');
router.use('/medics', Medic);

//|> /turns
const Turns = require('./routerturns');
router.use('/turns', Turns);

//|> /allUsers
const allUsers = require("./allUsers");
router.use("/allUsers" , allUsers);

//|> /login
const loginUser = require("./loginUser") 
router.use("/login" , loginUser) 

//|> /newPassword
const newPassword = require("./newPassword") 
router.use("/newPassword", newPassword)

//|> /passwordReset
const passwordReset = require("./passwordReset") 
router.use("/passwordReset", passwordReset) 

//|> /register
const registerUser = require("./registerUser")
router.use("/register", registerUser) 

//|> /oneUser
const userExist = require("./userExist");
router.use("/oneUser" , userExist)

module.exports = router;
