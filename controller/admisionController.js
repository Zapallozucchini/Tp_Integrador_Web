const admisionController = {

  // 2.1 Mostrar formulario: hay que traer pacientes y camas libres
  formNuevaAdmision: async (req, res) => {
    try {
      const [[pacientes], [camas]] = await Promise.all([
        req.db.promise().query('SELECT id, nombre FROM pacientes ORDER BY nombre'),
        req.db.promise().query(
          "SELECT id, ala, numero FROM camas WHERE disponible = TRUE"
        )
      ]);
      res.render('admisiones/nueva', {
        title: 'Nueva Admisión',
        pacientes,
        camas
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'No se pudo cargar el formulario.' });
    }
  },

  // 2.2 Crear admisión: insertar y marcar cama como no disponible
  crearAdmision: async (req, res) => {
    const { paciente_id, cama_id, motivo } = req.body;
    const conn = req.db.promise();
    try {
      await conn.query(
        `INSERT INTO admisiones (paciente_id, cama_id, motivo)
         VALUES (?, ?, ?)`,
        [paciente_id, cama_id, motivo]
      );
      await conn.query(`UPDATE camas SET disponible = FALSE WHERE id = ?`, [cama_id]);
      res.redirect('/admisiones');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'Error al crear admisión.' });
    }
  },

  // 2.3 Listar todas las admisiones
  listarAdmisiones: async (req, res) => {
    try {
      const [admisiones] = await req.db.promise().query(`
        SELECT a.id, p.nombre AS paciente, c.ala, c.numero,
               a.fecha_admision, a.motivo, a.estado
        FROM admisiones a
        JOIN pacientes p ON a.paciente_id = p.id
        JOIN camas c      ON a.cama_id      = c.id
        ORDER BY a.fecha_admision DESC
      `);
      res.render('admisiones/index', { title: 'Admisiones', admisiones });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'No se pudo cargar admisiones.' });
    }
  },

  // 2.4 Ver detalle de una admisión
  verAdmision: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await req.db.promise().query(
        `SELECT a.*, p.nombre AS paciente, c.ala, c.numero
         FROM admisiones a
         JOIN pacientes p ON a.paciente_id = p.id
         JOIN camas c ON a.cama_id = c.id
         WHERE a.id = ?`,
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).render('error', { message: 'Admisión no encontrada' });
      }
      res.render('admisiones/ver', { admision: rows[0] });
    } catch (error) {
      console.error('Error al obtener admisión:', error);
      res.status(500).send('Error interno');
    }
  },

  // 2.5 Actualizar estado: dar de alta o cancelar
  actualizarEstado: async (req, res) => {
    const { id } = req.params;
    const { nuevo_estado } = req.body;
    try {
      await req.db.promise().query(
        'UPDATE admisiones SET estado = ? WHERE id = ?',
        [nuevo_estado, id]
      );
      res.redirect(`/admisiones/${id}`); // Redirige al detalle actualizado
    } catch (error) {
      console.error('Error actualizando estado:', error);
      res.status(500).send('Error actualizando estado');
    }
  }

};

module.exports = admisionController;
