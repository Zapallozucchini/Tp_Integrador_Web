// app.js
const express = require('express');
const db = require('./config/db'); // Asegúrate de que la ruta sea correcta
const app = express();

// Configura Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado: http://localhost:${PORT}`);
});
 

// Middleware único para conexión DB
app.use(async (req, res, next) => {
  // Hacer db disponible en rutas
  req.db = db;
  
  // Verificar estado de conexión
  try {
    const [result] = await db.promise().query('SELECT 1+1 AS solution');
    res.locals.dbStatus = result[0].solution === 2 
      ? '✅ Conexión estable a la base de datos' 
      : '⚠️ Conexión inesperada';
  } catch (error) {
    res.locals.dbStatus = `❌ Error de conexión: ${error.message}`;
  }
  
  next();
});


// Importar rutas de pacientes
const pacienteRoutes = require('./routes/pacienteRoutes');



// Usar rutas de pacientes
app.use('/pacientes', pacienteRoutes);

