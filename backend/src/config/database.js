
const mysql2 = require('mysql2');

// Conexion a base de datos
const databaseConnection = mysql2.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user:  process.envDB_USER || 'root',
    // password: 'Yinet2006@@ñ',
    database: process.env.DB_NAME || 'db_dollarsoftware',
    port: process.env.DB_PORT || 3306,
});

console.log('Variables cargadas:', process.env.DB_PASSWORD);

module.exports = databaseConnection;