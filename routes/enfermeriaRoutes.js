const express = require('express');
const router = express.Router();
const enfermeriaController = require('../controller/enfermeriaController');
const { estaAutenticado } = require('../middleware/autenticacionMiddleware');

// Ruta principal de enfermería
router.get('/', estaAutenticado, enfermeriaController.listarAdmisionesParaSignos);

// Rutas existentes
router.get('/:admisionId/signos', estaAutenticado, enfermeriaController.listarSignos);
router.get('/:admisionId/signos/nuevo', estaAutenticado, enfermeriaController.formNuevoSigno);
router.post('/:admisionId/signos/nuevo', estaAutenticado, enfermeriaController.crearSigno);
router.get('/', estaAutenticado, enfermeriaController.listarAdmisionesParaSignos);
module.exports = router;