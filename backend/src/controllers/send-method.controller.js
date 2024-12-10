const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// MÉTODO DE ENVÍO /////////////////

// Buscar un método de envío en la base de datos

const readSendMethod = (req, res) => { 

    const { id_metodo_envio } = req.params;

    const readQuery = `SELECT * FROM metodo_de_envio WHERE id_metodo_envio=?;`;

    const query = mysql2.format(readQuery, [id_metodo_envio]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Método de envío no encontrado :('});
        }
    });

};


// Crear un método de envío en la tabla de métodos de envío en la base de datos


const createSendMethod = (req, res) => {
    const { id_metodo_envio, nombre_m_envio } = req.body;

    const createQuery = `INSERT INTO metodo_de_envio (id_metodo_envio, nombre_m_envio) VALUES (?,?);`;
    
    const query = mysql2.format(createQuery, [id_metodo_envio, nombre_m_envio]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Método de envío creado con éxito'});
    });
};


// Actualizar un estado de pedido en la tabla de estado de pedidos en la base de datos

const updateSendMethod = (req, res) => {
    const { id_metodo_envio } = req.params;
    const { nombre_m_envio } = req.body;

    const updateQuery = `UPDATE metodo_de_envio SET nombre_m_envio=? WHERE id_metodo_envio=?;`;

    const query = mysql2.format(updateQuery, [nombre_m_envio, id_metodo_envio]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Método de envío actualizado con éxito'});
    });
};

// Eliminar un método de envío en la tabla de métodos de envío en la base de datos

const deleteSendMethod = (req, res) => {
    const { id_metodo_envio } = req.params;
    
    const deleteQuery = `DELETE FROM metodo_de_envio WHERE id_metodo_envio=?;`;
    
    const query = mysql2.format(deleteQuery, [id_metodo_envio]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Método de envío eliminado con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readSendMethod,
    createSendMethod,
    updateSendMethod,
    deleteSendMethod, 
};