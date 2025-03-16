// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar una ciudad en la base de datos
const readCity = (id_ciudad) => {
    const query = mysql2.format('SELECT * FROM ciudades WHERE id_ciudad = ?;', [id_ciudad]);
    return database.promise().query(query);
};

// Crear una ciudad en la base de datos
const createCity = (id_ciudad, nombre_ciudad) => {
    const query = mysql2.format(
        'INSERT INTO ciudades (id_ciudad, nombre_ciudad) VALUES (?, ?);',
        [id_ciudad, nombre_ciudad]
    );
    return database.promise().query(query);
};

// Actualizar una ciudad en la base de datos
const updateCity = (id_ciudad, nombre_ciudad) => {
    const query = mysql2.format(
        'UPDATE ciudades SET nombre_ciudad = ? WHERE id_ciudad = ?;',
        [nombre_ciudad, id_ciudad]
    );
    return database.promise().query(query);
};

// Eliminar una ciudad en la base de datos
const deleteCity = (id_ciudad) => {
    const query = mysql2.format('DELETE FROM ciudades WHERE id_ciudad = ?;', [id_ciudad]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readCity,
    createCity,
    updateCity,
    deleteCity,
};