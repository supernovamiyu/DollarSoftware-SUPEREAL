// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un pedido en la base de datos
const readUserDelivery = (id_pedido) => {
    const query = mysql2.format('SELECT * FROM pedidos WHERE id_pedido = ?;', [id_pedido]);
    return database.promise().query(query);
};

// Crear un pedido en la base de datos
const createUserDelivery = (fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura) => {
    const query = mysql2.format(
        'INSERT INTO pedidos (fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura]
    );
    return database.promise().query(query);
};

// Actualizar un pedido en la base de datos
const updateUserDelivery = (id_pedido, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura) => {
    const query = mysql2.format(
        'UPDATE pedidos SET fk_id_metodo_envio=?, fecha_de_pedido=?, fk_id_ciudad=?, direccion=?, fk_id_estado_envio=?, subtotal=?, impuesto=?, total=?, vigencia_factura=? WHERE id_pedido=?;',
        [fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura, id_pedido]
    );
    return database.promise().query(query);
};

// Eliminar un pedido en la base de datos
const deleteUserDelivery = (id_pedido) => {
    const query = mysql2.format('DELETE FROM pedidos WHERE id_pedido = ?;', [id_pedido]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readUserDelivery,
    createUserDelivery,
    updateUserDelivery,
    deleteUserDelivery,
};