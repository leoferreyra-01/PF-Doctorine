const express = require('express');
const router = express.Router();

const { allUsers } = require('../../controllers/controllerLogin/getUsers');
router.get('/allUsers', allUsers);

const {
  loginUser,
  registerUser,
  userExist,
} = require('../../controllers/controllerLogin/postUserLogin');
router.post('/', loginUser);

router.post('/register', registerUser);

router.post('/oneUser', userExist);

module.exports = router;

// const usersChange = require("./routesLogin/routeLogin")
// router.use("/login", usersChange)
