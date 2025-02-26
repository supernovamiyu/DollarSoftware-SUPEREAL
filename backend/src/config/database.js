const mysql2 = require('mysql2');

// Conexion a base de datos
const databaseConnection = mysql2.createConnection({
    host: 'localhost',
    user:  'root',
    password: process.env.DB_PASSWORD || 'Hola1234@1234',
    database: 'db_dollarsoftware',
    port: 3306,
});

module.exports = databaseConnection;