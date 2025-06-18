exports.estaAutenticado = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }
  next();
};

// Middleware para verificar "admin"
exports.esAdmin = (req, res, next) => {
  if (!req.session.usuario || req.session.usuario.rol !== 'admin') {
    return res.status(403).send('Acceso denegado. Solo Admin.');
  }
  next();
};

req.session.usuario = {
  nombre: usuario.nombre,
  email: usuario.email
};