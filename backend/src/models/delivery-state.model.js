// Importar la conexión a la base de datos
const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un estado de pedido en la base de datos
const readDeliveryState = (id_estado_envio) => {
    const query = mysql2.format('SELECT * FROM estado_del_pedido WHERE id_estado_envio = ?;', [id_estado_envio]);
    return database.promise().query(query);
};

// Crear un estado de pedido en la base de datos
const createDeliveryState = (id_estado_envio, denominacion) => {
    const query = mysql2.format(
        'INSERT INTO estado_del_pedido (id_estado_envio, denominacion) VALUES (?, ?);',
        [id_estado_envio, denominacion]
    );
    return database.promise().query(query);
};

// Actualizar un estado de pedido en la base de datos
const updateDeliveryState = (id_estado_envio, denominacion) => {
    const query = mysql2.format(
        'UPDATE estado_del_pedido SET denominacion = ? WHERE id_estado_envio = ?;',
        [denominacion, id_estado_envio]
    );
    return database.promise().query(query);
};

// Eliminar un estado de pedido en la base de datos
const deleteDeliveryState = (id_estado_envio) => {
    const query = mysql2.format('DELETE FROM estado_del_pedido WHERE id_estado_envio = ?;', [id_estado_envio]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readDeliveryState,
    createDeliveryState,
    updateDeliveryState,
    deleteDeliveryState,
};