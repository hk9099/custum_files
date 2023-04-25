const express = require('express');
const router = express.Router();
const path = require('path');


const loginRoutes = require('../controller/loginController');
console.log('router is running');

router.post('/login', loginRoutes.login);

module.exports = router;

