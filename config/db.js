const mysql = require('mysql2');
const express = require('express');
const app = express();

// Usa createPool para manejar múltiples conexiones y promesas
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || 'switchback.proxy.rlwy.net',
  user: process.env.MYSQLUSER || 'railway',
  password: process.env.MYSQLPASSWORD || 'o3snoSCxdwB04PdBm5b8wJB6ePusliBZ',
  database: process.env.MYSQLDATABASE || 'railway',
  port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 39779,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Prueba la conexión al iniciar
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error de conexión a MySQL:', error.message);
    console.error('Código de error:', error.code);
    console.error('Stack:', error.stack);
    return;
  }
  console.log('✅ Conectado a MySQL. ID de conexión:', connection.threadId);
  connection.release();
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

module.exports = pool;