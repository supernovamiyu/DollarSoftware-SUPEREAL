const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// PRODUCTO /////////////////

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
    const { id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio } = req.body;

    const createQuery = `INSERT INTO productos (id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio) VALUES (?,?,?,?,?);`;
    
    const query = mysql2.format(createQuery, [id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio]);

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
};