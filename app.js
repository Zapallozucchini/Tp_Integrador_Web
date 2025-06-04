// app.js
const express = require('express');
const db = require('./config/db'); // Asegúrate de que la ruta sea correcta
const app = express();

// Configura Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware para manejar errores de conexión
app.use((req, res, next) => {
  req.db = db; // Hacemos la conexión disponible en las rutas
  next();
});

// Ruta principal
app.get('/', async (req, res) => {
  try {
    // Usa el pool de promesas directamente
    const [result] = await db.promise().query('SELECT 1+1 AS solution');
    const status = result[0].solution === 2 
      ? '✅ Conexión exitosa a la base de datos' 
      : '⚠️ Conexión inesperada';
    
    res.render('index', {
      title: 'Sistema Hospitalario',
      dbStatus: status
    });
    
  } catch (error) {
    const errorMessage = `❌ Error de conexión: ${error.message}`;
    console.error(errorMessage);
    res.render('index', {
      title: 'Sistema Hospitalario',
      dbStatus: errorMessage
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado: http://localhost:${PORT}`);
});
 
// Middleware para hacer db accesible en todas las vistas
app.use(async (req, res, next) => {
  try {
    const [result] = await db.promise().query('SELECT 1+1 AS solution');
    req.dbStatus = result[0].solution === 2 
      ? '✅ Conexión estable a la base de datos' 
      : '⚠️ Conexión inesperada';
  } catch (error) {
    req.dbStatus = `❌ Error de conexión: ${error.message}`;
  }
  
  // Hacer el estado disponible para todas las vistas
  res.locals.dbStatus = req.dbStatus;
  next();
});



// Importar rutas de pacientes
const pacienteRoutes = require('./routes/pacienteRoutes');

// ... (después de los middlewares)

// Usar rutas de pacientes
app.use('/pacientes', pacienteRoutes);

// ... (código posterior)