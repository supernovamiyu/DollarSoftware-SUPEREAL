// Importar la conexión a la base de datos
const database = require("../config/database")
const mysql2 = require("mysql2")

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un usuario en la base de datos
const readUser = (id_usuario) => {
    const query = mysql2.format("SELECT * FROM usuarios WHERE id_usuario = ?;", [id_usuario])
    return database.promise().query(query)
}

// Crear un usuario en la base de datos
const createUser = (correo, contraseña, nombre_completo, numero_identificacion) => {
    const query = mysql2.format(
        "INSERT INTO usuarios (correo, contraseña, nombre_completo, numero_identificacion) VALUES (?, ?, ?, ?);",
        [correo, contraseña, nombre_completo, numero_identificacion],
    )
    return database.promise().query(query)
}

// Actualizar un usuario en la base de datos
const updateUser = (id_usuario, correo, contraseña, nombre_completo, numero_identificacion) => {
    const query = mysql2.format(
        "UPDATE usuarios SET correo=?, contraseña=?, nombre_completo=?, numero_identificacion=? WHERE id_usuario=?;",
        [correo, contraseña, nombre_completo, numero_identificacion, id_usuario],
    )
    return database.promise().query(query)
}

// Eliminar un usuario en la base de datos
const deleteUser = (id_usuario) => {
    const query = mysql2.format("DELETE FROM usuarios WHERE id_usuario = ?;", [id_usuario])
    return database.promise().query(query)
}

// Buscar un usuario por correo electrónico
const findByEmail = (correo) => {
    const query = mysql2.format('SELECT * FROM usuarios WHERE correo = ?;', [correo]);
    return database.promise().query(query);
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser,
    findByEmail,
}

