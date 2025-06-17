const express = require('express');
const router = express.Router();
const medicoController = require('../controller/medicoController');
const { estaAutenticado } = require('../middleware/autenticacionMiddleware');

// Listado de evoluciones para una admisión
router.get('/:admisionId/evoluciones', estaAutenticado, medicoController.listarEvoluciones);

// Formulario para nueva evolución
router.get('/:admisionId/evoluciones/nuevo', estaAutenticado, medicoController.formNuevaEvolucion);

// Procesar nueva evolución
router.post('/:admisionId/evoluciones/nuevo', estaAutenticado, medicoController.crearEvolucion);

// Listado de admisiones
router.get('/', estaAutenticado, medicoController.listarAdmisiones);

module.exports = router;
