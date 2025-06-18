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
habitacionController.formEditar = async (req, res) => {
  const { id } = req.params;
  const [rows] = await req.db.promise().query('SELECT * FROM habitaciones WHERE id = ?', [id]);
  if (!rows.length) return res.redirect('/habitaciones');
  res.render('habitaciones/editar', { title: 'Editar Habitación', habitacion: rows[0] });
};

habitacionController.editar = async (req, res) => {
  const { id } = req.params;
  const { numero, piso, estado } = req.body;
  await req.db.promise().query(
    'UPDATE habitaciones SET numero=?, piso=?, estado=? WHERE id=?',
    [numero, piso, estado, id]
  );
  res.redirect('/habitaciones');
};

habitacionController.eliminar = async (req, res) => {
  const { id } = req.params;
  await req.db.promise().query('DELETE FROM habitaciones WHERE id=?', [id]);
  res.redirect('/habitaciones');
};
habitacionController.verAdmisiones = async (req, res) => {
  // Puedes implementar la lógica real después
  res.send('Aquí se mostrarán las admisiones de la habitación seleccionada.');
};
habitacionController.formNueva = (req, res) => {
  res.render('habitaciones/nueva', { title: 'Nueva Habitación' });
};

habitacionController.crear = async (req, res) => {
  const { numero, piso, estado } = req.body;
  await req.db.promise().query(
    'INSERT INTO habitaciones (numero, piso, estado) VALUES (?, ?, ?)',
    [numero, piso, estado]
  );
  res.redirect('/habitaciones');
};
module.exports = habitacionController;