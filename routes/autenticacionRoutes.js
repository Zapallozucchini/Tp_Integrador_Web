const express = require('express');
const router = express.Router();
const autenticacionController = require('../controller/autenticacionController');

router.get('/login', autenticacionController.formLogin);
router.post('/login', autenticacionController.login);
router.get('/logout', autenticacionController.logout);

module.exports = router;
