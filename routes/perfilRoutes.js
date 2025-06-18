const express = require('express');
const router = express.Router();
const { estaAutenticado } = require('../middleware/autenticacionMiddleware');

router.get('/', estaAutenticado, (req, res) => {
  res.render('perfil', { usuario: req.session.usuario });
});

module.exports = router;