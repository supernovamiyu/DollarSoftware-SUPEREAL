// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar el detalle de un pedido en la base de datos
const readDeliveryDetails = (fk_id_pedido) => {
    const query = mysql2.format('SELECT * FROM detalle_pedido WHERE fk_id_pedido = ?;', [fk_id_pedido]);
    return database.promise().query(query);
};

// Crear el detalle de un pedido en la base de datos
const createDeliveryDetails = (fk_id_producto, cantidad, precio_unitario) => {
    const query = mysql2.format(
        'INSERT INTO detalle_pedido (fk_id_pedido, fk_id_producto, cantidad, precio_unitario) VALUES (?, ?, ?);',
        [fk_id_producto, cantidad, precio_unitario]
    );
    return database.promise().query(query);
};

// Actualizar el detalle de un pedido en la base de datos
const updateDeliveryDetails = (fk_id_pedido, cantidad, precio_unitario, precio_total) => {
    const query = mysql2.format(
        'UPDATE detalle_pedido SET cantidad=?, precio_unitario=?, precio_total=? WHERE fk_id_pedido=?;',
        [cantidad, precio_unitario, precio_total, fk_id_pedido]
    );
    return database.promise().query(query);
};

// Eliminar el detalle de un pedido en la base de datos
const deleteDeliveryDetails = (fk_id_pedido) => {
    const query = mysql2.format('DELETE FROM detalle_pedido WHERE fk_id_pedido = ?;', [fk_id_pedido]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readDeliveryDetails,
    createDeliveryDetails,
    updateDeliveryDetails,
    deleteDeliveryDetails,
};