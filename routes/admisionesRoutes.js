const express = require('express');
const router = express.Router();
const admisionController = require('../controller/admisionController');
const pacienteController = require('../controller/pacienteController');
const enfermeriaController = require('../controller/enfermeriaController');

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


// Listado de admisiones para signos
router.get('/signos', enfermeriaController.listarAdmisionesParaSignos); // nueva ruta

module.exports = router;
