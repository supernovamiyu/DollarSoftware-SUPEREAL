// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar una opinión en la base de datos

const readOpinion = (id_opinion) => {
    const query = mysql2.format('SELECT * FROM opiniones WHERE id_opinion = ?;', [id_opinion]);
    return database.promise().query(query);
};

// Crear una nueva opinión en la base de datos

const createOpinion = (es_anonimo, opinion) => {
    const query = mysql2.format('INSERT INTO opiniones (es_anonimo, opinion) VALUES (?, ?);', [es_anonimo, opinion]);
    return database.promise().query(query);
};

// Actualizar una opinión en la base de datos

const updateOpinion = (id_opinion, es_anonimo, opinion) => {
    const query = mysql2.format('UPDATE opiniones SET es_anonimo = ?, opinion = ? WHERE id_opinion = ?;', [es_anonimo, opinion, id_opinion]);
    return database.promise().query(query);
};

// Eliminar una opinión de la base de datos

const deleteOpinion = (id_opinion) => {
    const query = mysql2.format('DELETE FROM opiniones WHERE id_opinion = ?;', [id_opinion]);
    return database.promise().query(query);
};

// Buscar la opinion de un producto en la base de datos

const readOpinionProduct = (fk_id_productos) => {
    const query = mysql2.format('SELECT * FROM opiniones WHERE fk_id_productos = ?;', [fk_id_productos]);
    return database.promise().query(query);
};

// Crear una nueva opinión de un producto en la base de datos

const createOpinionProduct = (es_anonimo, opinion, fk_id_productos) => {
    const query = mysql2.format('INSERT INTO opiniones (es_anonimo, opinion, fk_id_productos) VALUES (?, ?, ?);', [es_anonimo, opinion, fk_id_productos]);
    return database.promise().query(query);
};

// Actualizar una opinión de un producto en la base de datos

const updateOpinionProduct = (id_opinion, es_anonimo, opinion, fk_id_productos) => {
    const query = mysql2.format('UPDATE opiniones SET es_anonimo = ?, opinion = ?, fk_id_productos = ? WHERE id_opinion = ?;', [es_anonimo, opinion, fk_id_productos, id_opinion]);
    return database.promise().query(query);
};

// Eliminar una opinión de un producto de la base de datos

const deleteOpinionProduct = (id_opinion) => {
    const query = mysql2.format('DELETE FROM opiniones WHERE id_opinion = ?;', [id_opinion]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readOpinion,
    createOpinion,
    updateOpinion,
    deleteOpinion,
    readOpinionProduct,
    createOpinionProduct,
    updateOpinionProduct,
    deleteOpinionProduct
};