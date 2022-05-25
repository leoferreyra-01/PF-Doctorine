const express = require("express");
const router = express.Router();

const { allUsers } = require("../controllers/allUsers.controllers")

router.get("/", allUsers);

module.exports = router;