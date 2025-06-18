const express = require('express');
const router = express.Router();
const habitacionController = require('../controller/habitacionController');

// Listar habitaciones
router.get('/', habitacionController.listar);

// Mostrar formulario para nueva habitación
router.get('/nueva', habitacionController.formNueva);

// Procesar creación de nueva habitación
router.post('/nueva', habitacionController.crear);

module.exports = router;