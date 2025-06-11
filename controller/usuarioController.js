const bcrypt = require('bcryptjs');

const usuarioController = {

  verListado: async (req, res) => {
    try {
      const [usuarios] = await req.db.promise().query('SELECT id, nombre, email, rol FROM usuarios');
      res.render('usuarios/index', { title: 'Usuarios', usuarios });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).send('Error interno');
    }
  },

  formNuevo: (req, res) => {
    res.render('usuarios/nuevo', { title: 'Nuevo Usuario' });
  },

  crearUsuario: async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
      const hash = await bcrypt.hash(password, 10);
      await req.db.promise().query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, email, hash, rol]
      );
      res.redirect('/usuarios');
    } catch (error) {
      console.error('Error creando usuario:', error);
      res.status(500).send('Error al crear usuario');
    }
  }

};

module.exports = usuarioController;
