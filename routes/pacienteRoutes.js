const express = require('express');
const router = express.Router();
const pacienteController = require('../controller/pacienteController');

// Mostrar formulario de nuevo paciente
router.get('/nuevo', pacienteController.mostrarFormularioNuevo);

// Procesar formulario de nuevo paciente
router.post('/', pacienteController.crearPaciente);

// Listar pacientes
router.get('/', pacienteController.listarPacientes);

module.exports = router;