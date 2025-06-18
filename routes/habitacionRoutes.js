const express = require('express');
const router = express.Router();
const habitacionController = require('../controller/habitacionController');

router.get('/', habitacionController.listar);

module.exports = router;