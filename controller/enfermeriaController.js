const enfermeriaController = {

  // Mostrar listado de signos para una admisión
  listarSignos: async (req, res) => {
    const { admisionId } = req.params;
    try {
      // Obtener datos de admisión (paciente y cama)
      const [[admision]] = await req.db.promise().query(
        `SELECT a.id, p.nombre AS paciente, c.ala, c.numero
         FROM admisiones a
         JOIN pacientes p ON a.paciente_id = p.id
         JOIN camas c ON a.cama_id = c.id
         WHERE a.id = ?`, [admisionId]
      );

      // Obtener registros de signos
      const [signos] = await req.db.promise().query(
        `SELECT * FROM signos_vitales
         WHERE admision_id = ?
         ORDER BY fecha_registro DESC`, [admisionId]
      );

      res.render('enfermeria/index', {
        title: 'Signos Vitales',
        admision,
        signos
      });
    } catch (error) {
      console.error('Error listando signos:', error);
      res.status(500).send('Error interno');
    }
  },

  // Mostrar formulario de nuevo registro
  formNuevoSigno: (req, res) => {
    const { admisionId } = req.params;
    res.render('enfermeria/nuevo', {
      title: 'Registrar Signos Vitales',
      admisionId
    });
  },

  // Procesar y guardar nuevo registro
  crearSigno: async (req, res) => {
    const { admisionId } = req.params;
    const { temperatura, presion, pulso, anotaciones } = req.body;
    try {
      await req.db.promise().query(
        `INSERT INTO signos_vitales
         (admision_id, temperatura, presion, pulso, anotaciones)
         VALUES (?, ?, ?, ?, ?)`,
        [admisionId, temperatura, presion, pulso, anotaciones || null]
      );
      res.redirect(`/enfermeria/${admisionId}/signos`);
    } catch (error) {
      console.error('Error creando signo:', error);
      res.status(500).send('Error interno');
    }
  },

  // Listar admisiones activas para seleccionar
  listarAdmisionesParaSignos: async (req, res) => {
    try {
      const [admisiones] = await req.db.promise().query(`
        SELECT a.id, p.nombre AS paciente, c.ala, c.numero, a.fecha_admision
        FROM admisiones a
        JOIN pacientes p ON a.paciente_id = p.id
        JOIN camas c ON a.cama_id = c.id
        WHERE a.estado = 'Activa'
        ORDER BY a.fecha_admision DESC
      `);
      res.render('enfermeria/admisiones', { title: 'Elegir Admisión', admisiones });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno');
    }
  }

};

module.exports = enfermeriaController;
