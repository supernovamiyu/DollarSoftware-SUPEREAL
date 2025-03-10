const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// PRODUCTO /////////////////

// Buscar todos los productos en la base de datos

const getAllProducts = (req, res) => {
    const readAllQuery = `SELECT id_productos, nombre_producto, precio, unidades_disponibles, fk_id_categoria, imagen_url FROM productos;`;
    
    database.query(readAllQuery, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

// Buscar los productos que coincidan con el término de búsqueda en la base de datos

const getSimilarProducts = (req, res) => {
    const searchTerm = req.params.searchTerm;

    const similarProductsQuery = `SELECT * FROM productos WHERE nombre_producto LIKE ?`;
    
    const searchValue = `%${searchTerm}%`;

    database.query(similarProductsQuery, [searchValue], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

// Buscar los productos destacados en la base de datos

const getFeaturedProducts = (req, res) => {
    const readFeaturedQuery = `SELECT id_productos, nombre_producto, precio, unidades_disponibles, fk_id_categoria, imagen_url FROM productos WHERE destacado = 1;`;
    
    database.query(readFeaturedQuery, (err, result) => {
        if (err) {
            console.error('Error al obtener los productos destacados:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else if (result.length === 0) {
            res.json({ message: 'No se encontraron productos destacados' });
        } else {
            res.json(result);
        }
    });
};


// Buscar productos por categoria en la base de datos
const getProductCategory = (req, res) => {
    const { fk_id_categoria } = req.params;

    console.log('Categoría:', fk_id_categoria); // Verifica el valor

    const getProCatQuery = `SELECT * FROM productos INNER JOIN categorias ON productos.fk_id_categoria = categorias.id_categoria WHERE productos.fk_id_categoria = ?;`;

    const query = mysql2.format(getProCatQuery, [fk_id_categoria]);

    database.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length > 0) {
                res.json(result); // Devuelve todos los productos
            } else {
                res.json({ message: 'No han sido encontrados productos con esta categoría :(' });
            }
        }
    });
};


// Buscar un producto en la base de datos

const readProduct = (req, res) => { 

    const { id_productos } = req.params;

    const readQuery = `SELECT * FROM productos WHERE id_productos=?;`;

    const query = mysql2.format(readQuery, [id_productos]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Producto no encontrado :('});
        }
    });

};


// Crear un producto nuevo en la tabla de productos en la base de datos


const createProduct = (req, res) => {
    const { id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url } = req.body;

    const createQuery = `INSERT INTO productos (id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url) VALUES (?,?,?,?,?,?,?);`;
    
    const query = mysql2.format(createQuery, [id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Producto creado con éxito'});
    });
};


// Actualizar un producto en la tabla de productos en la base de datos

const updateProduct = (req, res) => {
    const { id_productos } = req.params;
    const { nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio } = req.body;

    const updateQuery = `UPDATE productos SET nombre_producto=?, unidades_stock=?, unidades_disponibles=?, fk_id_categoria=?, precio=? WHERE id_productos=?;`;

    const query = mysql2.format(updateQuery, [nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, id_productos]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Producto actualizado con éxito'});
    });
};

// Eliminar un producto en la tabla de productos en la base de datos

const deleteProduct = (req, res) => {
    const { id_productos } = req.params;
    
    const deleteQuery = `DELETE FROM productos WHERE id_productos=?;`;
    
    const query = mysql2.format(deleteQuery, [id_productos]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Producto eliminado con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductCategory,
    getFeaturedProducts,
    getSimilarProducts,
};