const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// PEDIDOS /////////////////



// Buscar un pedido en la tabla de pedidos en la base de datos 

const readUserDelivery = (req, res) => { 

    const { fk_id_usuario } = req.params;

    const readQuery = `SELECT * FROM pedidos WHERE fk_id_usuario=?;`;

    const query = mysql2.format(readQuery, [fk_id_usuario]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Pedido no encontrado :('});
        }
    });

};

// Crear un pedido en la tabla de pedidos en la base de datos


const createUserDelivery = (req, res) => {
    const { fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura } = req.body;

    const createQuery = `INSERT INTO pedidos (fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
    
    const query = mysql2.format(createQuery, [fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Pedido creado con éxito'});
    });
};


// Actualizar un pedido en la tabla de pedidos en la base de datos

const updateUserDelivery = (req, res) => {
    const { fk_id_usuario } = req.params;
    const { fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura } = req.body;

    const updateQuery = `UPDATE pedidos SET fk_id_metodo_envio=?, fecha_de_pedido=?, fk_id_ciudad=?, direccion=?, fk_id_estado_envio=?, subtotal=?, impuesto=?, total=?, vigencia_factura=? WHERE fk_id_usuario=?;`;

    const query = mysql2.format(updateQuery, [fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura, fk_id_usuario]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Pedido actualizado con éxito'});
    });
};

// Eliminar un pedido en la tabla de pedidos en la base de datos

const deleteUserDelivery = (req, res) => {
    const { fk_id_usuario } = req.params;
    
    const deleteQuery = `DELETE FROM pedidos WHERE fk_id_usuario=?;`;
    
    const query = mysql2.format(deleteQuery, [fk_id_usuario]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Pedido eliminado con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readUserDelivery,
    createUserDelivery,
    updateUserDelivery,
    deleteUserDelivery, 
};