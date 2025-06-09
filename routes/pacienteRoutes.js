const express = require('express');
const router = express.Router();
const pacienteController = require('../controller/pacienteController');

// Mostrar formulario de nuevo paciente
router.get('/nuevo', pacienteController.mostrarFormularioNuevo);
// Procesar formulario de nuevo paciente
router.post('/', pacienteController.crearPaciente);

// Mostrar formulario para editar un paciente por ID
router.get('/:id/editar', pacienteController.mostrarFormularioEditar);
// Procesar el formulario de edición
router.post('/:id/editar', pacienteController.actualizarPaciente);


// Procesar la eliminación de un paciente por ID
router.post('/:id/eliminar', pacienteController.eliminarPaciente);
router.get('/', pacienteController.listarPacientes);
module.exports = router;