const bcrypt = require('bcryptjs');
const autenticacionController = {
  formLogin: (req, res) => {
    res.render('autenticacion/login', { title: 'Iniciar Sesión' });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const [rows] = await req.db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
      if (rows.length === 0) {
        req.flash('mensaje', 'Usuario no encontrado');
        return res.redirect('/auth/login');
      }

      const usuario = rows[0];
      const passwordValida = await bcrypt.compare(password, usuario.password);
      if (!passwordValida) {
        req.flash('mensaje', 'Contraseña incorrecta');
        return res.redirect('/auth/login');
      }

      // Guardar datos mínimos en sesión
      req.session.usuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      };

      res.redirect('/');
    } catch (error) {
      console.error('Error login:', error);
      res.status(500).send('Error en el servidor');
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }
};

module.exports = autenticacionController;
