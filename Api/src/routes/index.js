const { Router } = require("express");
const passwordReset = require("./passwordReset.routes") 
const newPassword = require("./newPassword.routes") 
const registerUser = require("./registerUser.routes") 
const loginUser = require("./loginUser.routes") 
const allUsers = require("./allUsers.routes") 
const userExist = require("./userExist.routes");

 
const router = Router();
//especificamos que ruta va a acceder la informacion de getProducts
router.use("/passwordReset", passwordReset) 
router.use("/newPassword", newPassword) 
router.use("/register", registerUser) 
router.use("/login" , loginUser) 
router.use("/allUsers" , allUsers) 
router.use("/oneUser" , userExist)

module.exports = router;

// ******************************************************************************
// USUARIOS TEST:
// VENDEDOR
// {
//     "id": 1103818355,
//     "nickname": "TETE3034221",
//     "password": "qatest8772",
//     "site_status": "active",
//     "email": "test_user_23426925@testuser.com"
// }

// COMPRADOR
// {
//     "id": 1103821005,
//     "nickname": "TEST13H7QYQT",
//     "password": "qatest2339",
//     "site_status": "active",
//     "email": "test_user_36306526@testuser.com"
// }

// ******************************************************************************

// Access Token USUARIO VENDEDOR
// APP_USR-5816583834132762-040916-8d2fb925bd3a46afdff9171639461127-1103818355

// ******************************************************************************