const express = require('express');
const router = express.Router();
const admisionController = require('../controller/admisionController');

// Formulario para nueva admisión
router.get('/nueva', admisionController.formNuevaAdmision);

// Procesar creación
router.post('/nueva', admisionController.crearAdmision);

// Listado de admisiones
router.get('/', admisionController.listarAdmisiones);

// Ver detalles de una admisión
router.get('/:id', admisionController.verAdmision);

// Dar de alta o cancelar
router.post('/:id/actualizar-estado', admisionController.actualizarEstado);

module.exports = router;
