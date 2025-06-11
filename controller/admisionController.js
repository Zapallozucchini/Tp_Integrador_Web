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
      const [[admision]] = await req.db.promise().query(`
        SELECT a.*, p.nombre AS paciente, c.ala, c.numero
        FROM admisiones a
        JOIN pacientes p ON a.paciente_id = p.id
        JOIN camas c      ON a.cama_id      = c.id
        WHERE a.id = ?
      `, [id]);
      if (!admision) return res.status(404).render('error', { message: 'Admisión no encontrada' });
      res.render('admisiones/ver', { title: 'Detalle de Admisión', admision });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'Error al cargar detalle.' });
    }
  },

  // 2.5 Actualizar estado: dar de alta o cancelar
  actualizarEstado: async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body; // 'Dada de alta' o 'Cancelada'
    const conn = req.db.promise();
    try {
      // 1) Obtener la admisión para recuperar cama_id
      const [[adm]] = await conn.query('SELECT cama_id FROM admisiones WHERE id = ?', [id]);
      if (!adm) throw new Error('Admisión no encontrada');

      // 2) Actualizar estado y fecha_alta si corresponde
      const fechaAltaSql = estado === 'Dada de alta' ? ', fecha_alta = NOW()' : '';
      await conn.query(
        `UPDATE admisiones
         SET estado = ? ${fechaAltaSql}
         WHERE id = ?`,
        [estado, id]
      );

      // 3) Liberar cama si ya no está 'Activa'
      if (estado !== 'Activa') {
        await conn.query('UPDATE camas SET disponible = TRUE WHERE id = ?', [adm.cama_id]);
      }

      res.redirect('/admisiones');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'No se pudo actualizar estado.' });
    }
  }

};

module.exports = admisionController;
