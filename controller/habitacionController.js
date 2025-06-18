
const habitacionController = {
  listar: async (req, res) => {
    try {
      const [habitaciones] = await req.db.promise().query('SELECT * FROM habitaciones');
      res.render('habitaciones/index', { title: 'Habitaciones', habitaciones });
    } catch (error) {
      console.error('Error al listar habitaciones:', error);
      res.status(500).send('Error interno al listar habitaciones');
    }
  }
};

module.exports = habitacionController;