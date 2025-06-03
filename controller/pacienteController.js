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

// Función para listar pacientes (se mantiene igual)
const listarPacientes = async (req, res) => {
  try {
    const [pacientes] = await req.db.promise().query('SELECT * FROM pacientes');
    res.render('pacientes/index', { pacientes });
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).send("Error al cargar los pacientes");
  }
};

module.exports = {
  crearPaciente,
  listarPacientes
};