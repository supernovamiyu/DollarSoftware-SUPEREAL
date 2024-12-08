const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// USUARIOS /////////////////



// Buscar un usuario en la tabla de usuarios en la base de datos 

const readUser = (req, res) => { 

    const { id_usuario } = req.params;

    const readQuery = `SELECT * FROM usuarios WHERE id_usuario=?;`;

    const query = mysql2.format(readQuery, [id_usuario]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Usuario no encontrado :('});
        }
    });

};

// Crear un usuario en la tabla de usuarios en la base de datos


const createUser = (req, res) => {
    const { correo, contraseña, nombre_completo, numero_identificacion } = req.body;

    const createQuery = `INSERT INTO usuarios (correo, contraseña, nombre_completo, numero_identificacion) VALUES (?,?,?,?);`;
    
    const query = mysql2.format(createQuery, [correo, contraseña, nombre_completo, numero_identificacion]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Usuario creado con éxito'});
    });
};


// Actualizar un usuario en la tabla de usuarios en la base de datos

const updateUser = (req, res) => {
    const { id_usuario } = req.params;
    const { correo, contraseña, nombre_completo, numero_identificacion } = req.body;

    const updateQuery = `UPDATE usuarios SET correo=?, contraseña=?, nombre_completo=?, numero_identificacion=? WHERE id_usuario=?;`;

    const query = mysql2.format(updateQuery, [correo, contraseña, nombre_completo, numero_identificacion, id_usuario]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Usuario actualizado con éxito'});
    });
};

// Eliminar un usuario en la tabla de usuarios en la base de datos

const deleteUser = (req, res) => {
    const { id_usuario } = req.params;
    
    const deleteQuery = `DELETE FROM usuarios WHERE id_usuario=?;`;
    
    const query = mysql2.format(deleteQuery, [id_usuario]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Usuario eliminado con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser, 
};