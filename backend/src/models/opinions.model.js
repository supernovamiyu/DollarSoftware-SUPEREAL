// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar una opinión en la base de datos
const readOpinion = (id_opinion) => {
    const query = mysql2.format('SELECT * FROM opiniones WHERE id_opinion = ?;', [id_opinion]);
    return database.promise().query(query);
};

const createOpinion = (es_anonimo, opinion) => {
    const query = mysql2.format('INSERT INTO opiniones (es_anonimo, opinion) VALUES (?, ?);', [es_anonimo, opinion]);
    return database.promise().query(query);
};

const updateOpinion = (id_opinion, es_anonimo, opinion) => {
    const query = mysql2.format('UPDATE opiniones SET es_anonimo = ?, opinion = ? WHERE id_opinion = ?;', [es_anonimo, opinion, id_opinion]);
    return database.promise().query(query);
};

const deleteOpinion = (id_opinion) => {
    const query = mysql2.format('DELETE FROM opiniones WHERE id_opinion = ?;', [id_opinion]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readOpinion,
    createOpinion,
    updateOpinion,
    deleteOpinion,
};