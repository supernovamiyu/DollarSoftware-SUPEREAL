const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// DETALLE-PEDIDO /////////////////

// Buscar el detalle de un pedido en la base de datos

const readDeliveryDetails = (req, res) => { 

    const { id_detalle_pedido } = req.params;

    const readQuery = `SELECT * FROM detalle_pedido WHERE id_detalle_pedido=?;`;

    const query = mysql2.format(readQuery, [id_detalle_pedido]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Detalle del pedido no encontrado :(. Por favor verifica el id del pedido en la base de datos'});
        }
    });

};


// Crear el detalle de un pedido en la tabla de detalle_pedido en la base de datos


const createDeliveryDetails = (req, res) => {
    const { fk_id_pedido, fk_id_producto, cantidad, precio_unitario, precio_total } = req.body;

    const createQuery = `INSERT INTO detalle_pedido (fk_id_pedido, fk_id_producto, cantidad, precio_unitario, precio_total) VALUES (?,?,?,?,?);`;
    
    const query = mysql2.format(createQuery, [fk_id_pedido, fk_id_producto, cantidad, precio_unitario, precio_total]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Detalle del pedido asignado con éxito'});
    });
};


// Actualizar el detalle de un pedido en la tabla de detalle_pedido en la base de datos

const updateDeliveryDetails = (req, res) => {
    const { id_detalle_pedido } = req.params;
    const { cantidad, precio_unitario, precio_total } = req.body;

    const updateQuery = `UPDATE detalle_pedido SET cantidad=?, precio_unitario=?, precio_total=? WHERE id_detalle_pedido=?;`;

    const query = mysql2.format(updateQuery, [cantidad, precio_unitario, precio_total, id_detalle_pedido]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Detalle del pedido actualizado con éxito'});
    });
};

// Eliminar el detalle de un pedido en la tabla de detalle_pedido en la base de datos

const deleteDeliveryDetails = (req, res) => {
    const { id_detalle_pedido } = req.params;
    
    const deleteQuery = `DELETE FROM detalle_pedido WHERE id_detalle_pedido=?;`;
    
    const query = mysql2.format(deleteQuery, [id_detalle_pedido]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Detalle del pedido eliminado con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readDeliveryDetails,
    createDeliveryDetails,
    updateDeliveryDetails,
    deleteDeliveryDetails, 
};