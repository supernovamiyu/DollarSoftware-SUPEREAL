const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// ESTADO DEL PEDIDO /////////////////

// Buscar un estado de pedido en la base de datos

const readDeliveryState = (req, res) => { 

    const { id_estado_envio } = req.params;

    const readQuery = `SELECT * FROM estado_del_pedido WHERE id_estado_envio=?;`;

    const query = mysql2.format(readQuery, [id_estado_envio]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Estado de envío no encontrado :('});
        }
    });

};


// Crear un estado de pedido en la tabla de estado de pedidos en la base de datos


const createDeliveryState = (req, res) => {
    const { id_estado_envio, denominacion } = req.body;

    const createQuery = `INSERT INTO estado_del_pedido (id_estado_envio, denominacion) VALUES (?,?);`;
    
    const query = mysql2.format(createQuery, [id_estado_envio, denominacion]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Estado de envío creado con éxito'});
    });
};


// Actualizar un estado de pedido en la tabla de estado de pedidos en la base de datos

const updateDeliveryState = (req, res) => {
    const { id_estado_envio } = req.params;
    const { denominacion } = req.body;

    const updateQuery = `UPDATE estado_del_pedido SET denominacion=? WHERE id_estado_envio=?;`;

    const query = mysql2.format(updateQuery, [denominacion, id_estado_envio]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Estado de envío actualizado con éxito'});
    });
};

// Eliminar una categoria en la tabla de usuarios en la base de datos

const deleteDeliveryState = (req, res) => {
    const { id_estado_envio } = req.params;
    
    const deleteQuery = `DELETE FROM estado_del_pedido WHERE id_estado_envio=?;`;
    
    const query = mysql2.format(deleteQuery, [id_estado_envio]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Estado de envío eliminado con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readDeliveryState,
    createDeliveryState,
    updateDeliveryState,
    deleteDeliveryState, 
};