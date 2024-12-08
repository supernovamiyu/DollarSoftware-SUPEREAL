const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// PRECIOS /////////////////

// Buscar el precio de un producto en la base de datos

const readProductPrice = (req, res) => { 

    const { fk_id_producto } = req.params;

    const readQuery = `SELECT * FROM precios WHERE fk_id_producto=?;`;

    const query = mysql2.format(readQuery, [fk_id_producto]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Precio no encontrado :(. Por favor verifica el id del producto en la base de datos'});
        }
    });

};


// IMPORTANTE! Antes de crear un precio para un producto, corrobore si ese producto existe en la base de datos de Dollar Software, específicamente en la tabla de productos
// Crear un producto con un precio nuevo en la tabla de productos en la base de datos


const createProductPrice = (req, res) => {
    const { fk_id_producto, precio_original, descuento, precio_definitivo, fecha_inicio, fecha_final } = req.body;

    const createQuery = `INSERT INTO precios (fk_id_producto, precio_original, descuento, precio_definitivo, fecha_inicio, fecha_final) VALUES (?,?,?,?,?,?);`;
    
    const query = mysql2.format(createQuery, [fk_id_producto, precio_original, descuento, precio_definitivo, fecha_inicio, fecha_final]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Precio asignado con éxito'});
    });
};


// Actualizar el precio de un producto en la tabla de precios en la base de datos

const updateProductPrice = (req, res) => {
    const { fk_id_producto } = req.params;
    const { precio_original, descuento, precio_definitivo, fecha_inicio, fecha_final } = req.body;

    const updateQuery = `UPDATE precios SET precio_original=?, descuento=?, fecha_inicio=?, fecha_final=? WHERE fk_id_producto=?;`;

    const query = mysql2.format(updateQuery, [precio_original, descuento, precio_definitivo, fecha_inicio, fecha_final, fk_id_producto]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Precio del producto actualizado con éxito'});
    });
};

// Eliminar el precio de un producto en la tabla de precios en la base de datos

const deleteProductPrice = (req, res) => {
    const { fk_id_producto } = req.params;
    
    const deleteQuery = `DELETE FROM precios WHERE fk_id_producto=?;`;
    
    const query = mysql2.format(deleteQuery, [fk_id_producto]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Precio del producto eliminado con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readProductPrice,
    createProductPrice,
    updateProductPrice,
    deleteProductPrice, 
};