const PacienteController = {
  listarPacientes: async (req, res) => {
    try {
      const [pacientes] = await req.db.promise().query('SELECT * FROM pacientes');
      res.render('pacientes/index', { 
        pacientes,
        title: 'Listado de Pacientes' 
      });
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
      res.status(500).render('error', { 
        message: "Error al cargar los pacientes"
      });
    }
  },

  // Función para mostrar el formulario de nuevo paciente
  mostrarFormularioNuevo: (req, res) => {
    res.render('pacientes/nuevo', {
      title: 'Nuevo Paciente'
    });
  },

  // Función para crear un nuevo paciente
  crearPaciente: async (req, res) => {
    const { nombre, fecha_nacimiento, genero, direccion, telefono, contacto_emergencia } = req.body;
    
    try {
      const query = `
        INSERT INTO pacientes 
        (nombre, fecha_nacimiento, genero, direccion, telefono, contacto_emergencia)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      const [result] = await req.db.promise().query(query, [
        nombre,
        fecha_nacimiento,
        genero,
        direccion || null,
        telefono || null,
        contacto_emergencia || null
      ]);

      // Redirigir al listado de pacientes después de crear
      res.redirect('/pacientes');
    } catch (error) {
      console.error("Error al crear paciente:", error);
      
      // Mostrar el formulario nuevamente con el error
      res.render('pacientes/nuevo', {
        title: 'Nuevo Paciente',
        error: "Error al guardar el paciente. Por favor intente nuevamente.",
        // Mantener los valores ingresados para no perderlos
        paciente: req.body
      });
    }
  },

  // Función para mostrar el formulario de edición
  mostrarFormularioEditar: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await req.db.promise().query('SELECT * FROM pacientes WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        return res.status(404).render('error', { message: 'Paciente no encontrado' });
      }
      
      res.render('pacientes/editar', {
        title: 'Editar Paciente',
        paciente: rows[0]
      });
    } catch (error) {
      console.error("Error al obtener paciente para editar:", error);
      res.status(500).render('error', { message: "Error al cargar el paciente" });
    }
  },

  // Función para actualizar un paciente
  actualizarPaciente: async (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_nacimiento, genero, direccion, telefono, contacto_emergencia } = req.body;

    try {
      const query = `
        UPDATE pacientes SET 
          nombre = ?, 
          fecha_nacimiento = ?, 
          genero = ?, 
          direccion = ?, 
          telefono = ?, 
          contacto_emergencia = ?
        WHERE id = ?
      `;
      await req.db.promise().query(query, [
        nombre,
        fecha_nacimiento,
        genero,
        direccion || null,
        telefono || null,
        contacto_emergencia || null,
        id
      ]);
      res.redirect('/pacientes');
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      res.render('pacientes/editar', {
        title: 'Editar Paciente',
        error: "Error al actualizar el paciente. Por favor intente nuevamente.",
        paciente: { id, nombre, fecha_nacimiento, genero, direccion, telefono, contacto_emergencia }
      });
    }
  },

  // Función para eliminar un paciente
  eliminarPaciente: async (req, res) => {
    const { id } = req.params;
    try {
      await req.db.promise().query('DELETE FROM pacientes WHERE id = ?', [id]);
      res.redirect('/pacientes');
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      res.status(500).render('error', { message: "Error al eliminar el paciente" });
    }
  } 
};

module.exports = PacienteController;