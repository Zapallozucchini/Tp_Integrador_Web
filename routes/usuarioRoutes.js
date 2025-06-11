const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { estaAutenticado, esAdmin } = require('../middleware/autenticacionMiddleware');

router.get('/', estaAutenticado, esAdmin, usuarioController.verListado);
router.get('/nuevo', estaAutenticado, esAdmin, usuarioController.formNuevo);
router.post('/nuevo', estaAutenticado, esAdmin, usuarioController.crearUsuario);




module.exports = router;
