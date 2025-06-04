const crearPaciente = async (req, res) => {
  const {
    nombre,
    fecha_nacimiento,
    genero,
    direccion,
    telefono,
    contacto_emergencia
  } = req.body;

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

    res.redirect('/pacientes');
  } catch (error) {
    console.error("Error al crear paciente:", error);
    res.render('pacientes/nuevo', {
      error: "Error al guardar el paciente. Por favor intente nuevamente."
    });
  }
};

const listarPacientes = async (req, res) => {
  try {
    // Obtener todos los pacientes de la base de datos
    const [pacientes] = await req.db.promise().query('SELECT * FROM pacientes');
    
    // Renderizar la vista con los datos
    res.render('pacientes/index', { 
      pacientes,
      title: 'Listado de Pacientes' 
    });
    
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).render('error', { 
      message: "Error al cargar los pacientes",
      error
    });
  }
};

module.exports = {
  crearPaciente,
  listarPacientes
};