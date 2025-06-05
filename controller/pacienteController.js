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
  }
};

module.exports = PacienteController;