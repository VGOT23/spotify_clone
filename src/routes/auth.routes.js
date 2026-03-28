const express = require('express');
const authcontroller = require('../controller/auth.controller');
const router = express.Router();

router.post('/register',authcontroller.registerUser);

module.exports = router;