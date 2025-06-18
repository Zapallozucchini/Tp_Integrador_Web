require('dotenv').config(); // <-- Esto debe ir primero
const express = require('express');
const db = require('./config/db'); // Asegúrate de que la ruta sea correcta
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

// Configura Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware para parsear datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'hospital_secret', // Cambia esto en producción
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// VARIABLES GLOBALES PARA LAS VISTAS (mueve esto arriba)
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  res.locals.mensaje = req.flash('mensaje');
  next();
});

// Iniciar servidor
const PORT = process.env.PORT;
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

// --- AHORA VAN TUS RUTAS ---
const autenticacionRoutes = require('./routes/autenticacionRoutes');
app.use('/auth', autenticacionRoutes);

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);

const enfermeriaRoutes = require('./routes/enfermeriaRoutes');
app.use('/enfermeria', enfermeriaRoutes);

const pacienteRoutes = require('./routes/pacienteRoutes');
app.use('/pacientes', pacienteRoutes);

const admisionesRoutes = require('./routes/admisionesRoutes');
app.use('/admisiones', admisionesRoutes);

const medicoRoutes = require('./routes/medicoRoutes');
app.use('/medicos', medicoRoutes);

const habitacionRoutes = require('./routes/habitacionRoutes');
app.use('/habitaciones', habitacionRoutes);


// Ruta de inicio
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Sistema Hospitalario',
    dbStatus: res.locals.dbStatus
  });
});
