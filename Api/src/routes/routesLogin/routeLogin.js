const express = require('express');
const router = express.Router();

const { allUsers } = require('../../controllers/controllerLogin/getUsers');
router.get('/allUsers', allUsers);

const {
  loginUser,
  registerUser,
  userExist,
} = require('../../controllers/controllerLogin/postUserLogin');
// router.post('/', loginUser);

router.post('/', async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'ERR_LOGIN',
      description: 'The was a problem logging in',
      message: error.message,
    })
  }
});

router.post('/register', registerUser);

router.post('/oneUser', userExist);

module.exports = router;

// const usersChange = require("./routesLogin/routeLogin")
// router.use("/login", usersChange)
