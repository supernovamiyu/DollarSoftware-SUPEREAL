// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar todos los productos en la base de datos
const getAllProducts = () => {
    const query = `SELECT id_productos, nombre_producto, precio, unidades_disponibles, fk_id_categoria, imagen_url FROM productos;`;
    return database.promise().query(query);
};

// Buscar productos similares en la base de datos
const getSimilarProducts = (searchTerm) => {
    const query = mysql2.format('SELECT * FROM productos WHERE nombre_producto LIKE ?;', [`%${searchTerm}%`]);
    return database.promise().query(query);
};

// Buscar productos destacados en la base de datos
const getFeaturedProducts = () => {
    const query = `SELECT id_productos, nombre_producto, precio, unidades_disponibles, descripcion, fk_id_categoria, imagen_url FROM productos WHERE destacado = 1;`;
    return database.promise().query(query);
};

// Buscar productos por categoría en la base de datos
const getProductCategory = (fk_id_categoria) => {
    const query = mysql2.format(
        'SELECT * FROM productos INNER JOIN categorias ON productos.fk_id_categoria = categorias.id_categoria WHERE productos.fk_id_categoria = ?;',
        [fk_id_categoria]
    );
    return database.promise().query(query);
};

// Buscar un producto en la base de datos
const readProduct = (id_productos) => {
    const query = mysql2.format('SELECT * FROM productos WHERE id_productos = ?;', [id_productos]);
    return database.promise().query(query);
};

// Crear un producto en la base de datos
const createProduct = (id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url) => {
    const query = mysql2.format(
        'INSERT INTO productos (id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url]
    );
    return database.promise().query(query);
};

// Actualizar un producto en la base de datos
const updateProduct = (id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio) => {
    const query = mysql2.format(
        'UPDATE productos SET nombre_producto=?, unidades_stock=?, unidades_disponibles=?, fk_id_categoria=?, precio=? WHERE id_productos=?;',
        [nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, id_productos]
    );
    return database.promise().query(query);
};

// Eliminar un producto en la base de datos
const deleteProduct = (id_productos) => {
    const query = mysql2.format('DELETE FROM productos WHERE id_productos = ?;', [id_productos]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    getAllProducts,
    getSimilarProducts,
    getFeaturedProducts,
    getProductCategory,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};