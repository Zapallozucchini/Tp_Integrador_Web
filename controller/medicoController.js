const medicoController = {

  listarEvoluciones: async (req, res) => {
    const { admisionId } = req.params;
    try {
      const [[admision]] = await req.db.promise().query(`
        SELECT a.id, p.nombre AS paciente, c.ala, c.numero
        FROM admisiones a
        JOIN pacientes p ON a.paciente_id = p.id
        JOIN camas c ON a.cama_id = c.id
        WHERE a.id = ?`, [admisionId]
      );

      const [evoluciones] = await req.db.promise().query(
        'SELECT * FROM evoluciones WHERE admision_id = ? ORDER BY fecha_registro DESC',
        [admisionId]
      );

      res.render('medicos/index', { title: 'Evoluciones Médicas', admision, evoluciones });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error cargando evoluciones');
    }
  },

  formNuevaEvolucion: (req, res) => {
    res.render('medicos/nuevo', {
      title: 'Nueva Evolución Médica',
      admisionId: req.params.admisionId
    });
  },

  crearEvolucion: async (req, res) => {
    const { admisionId } = req.params;
    const { descripcion } = req.body;
    try {
      await req.db.promise().query(
        'INSERT INTO evoluciones (admision_id, descripcion) VALUES (?, ?)',
        [admisionId, descripcion]
      );
      res.redirect(`/medicos/${admisionId}/evoluciones`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error guardando evolución');
    }
  },

  listarAdmisiones: async (req, res) => {
    try {
      const [admisiones] = await req.db.promise().query(`
        SELECT a.id, p.nombre AS paciente, c.ala, c.numero
        FROM admisiones a
        JOIN pacientes p ON a.paciente_id = p.id
        JOIN camas c ON a.cama_id = c.id
        WHERE a.estado = 'Activa'
        ORDER BY a.fecha_admision DESC
      `);
      res.render('medicos/admisiones', { title: 'Admisiones Activas', admisiones });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error cargando admisiones');
    }
  },

};

module.exports = medicoController;
