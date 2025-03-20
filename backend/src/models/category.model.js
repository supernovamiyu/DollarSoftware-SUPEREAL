// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar una categoría en la base de datos
const readCategory = (id_categoria) => {
    const query = mysql2.format('SELECT * FROM categorias WHERE id_categoria = ?;', [id_categoria]);
    return database.promise().query(query);
};

// Crear una categoría en la base de datos
const createCategory = (id_categoria, nombre_categoria) => {
    const query = mysql2.format(
        'INSERT INTO categorias (id_categoria, nombre_categoria) VALUES (?, ?);',
        [id_categoria, nombre_categoria]
    );
    return database.promise().query(query);
};

// Actualizar una categoría en la base de datos
const updateCategory = (id_categoria, nombre_categoria) => {
    const query = mysql2.format(
        'UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?;',
        [nombre_categoria, id_categoria]
    );
    return database.promise().query(query);
};

// Eliminar una categoría en la base de datos
const deleteCategory = (id_categoria) => {
    const query = mysql2.format('DELETE FROM categorias WHERE id_categoria = ?;', [id_categoria]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};