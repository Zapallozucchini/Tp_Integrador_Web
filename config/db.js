const mysql = require('mysql2');
const express = require('express');
const app = express();
require('dotenv').config();
// Usa createPool para manejar múltiples conexiones y promesas
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
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