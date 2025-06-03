// db.js
const mysql = require('mysql2');


// Usa createPool para manejar múltiples conexiones y promesas
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
  port: 3306,
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

module.exports = pool;