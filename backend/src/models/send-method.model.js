// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un método de envío en la base de datos
const readSendMethod = (id_metodo_envio) => {
    const query = mysql2.format('SELECT * FROM metodo_de_envio WHERE id_metodo_envio = ?;', [id_metodo_envio]);
    return database.promise().query(query);
};

// Crear un método de envío en la base de datos
const createSendMethod = (id_metodo_envio, nombre_m_envio) => {
    const query = mysql2.format(
        'INSERT INTO metodo_de_envio (id_metodo_envio, nombre_m_envio) VALUES (?, ?);',
        [id_metodo_envio, nombre_m_envio]
    );
    return database.promise().query(query);
};

// Actualizar un método de envío en la base de datos
const updateSendMethod = (id_metodo_envio, nombre_m_envio) => {
    const query = mysql2.format(
        'UPDATE metodo_de_envio SET nombre_m_envio=? WHERE id_metodo_envio=?;',
        [nombre_m_envio, id_metodo_envio]
    );
    return database.promise().query(query);
};

// Eliminar un método de envío en la base de datos
const deleteSendMethod = (id_metodo_envio) => {
    const query = mysql2.format('DELETE FROM metodo_de_envio WHERE id_metodo_envio = ?;', [id_metodo_envio]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readSendMethod,
    createSendMethod,
    updateSendMethod,
    deleteSendMethod,
};