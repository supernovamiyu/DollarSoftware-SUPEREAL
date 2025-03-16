// Importar el modelo de usuarios
const userModel = require('../models/user.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un usuario en la base de datos
const readUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        // Validar que el ID del usuario esté presente
        if (!id_usuario) {
            return res.status(400).json({ message: 'El ID del usuario es obligatorio' });
        }

        // Llamar al modelo para obtener el usuario
        const [result] = await userModel.readUser(id_usuario);

        // Verificar si se encontró el usuario
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.json({ message: 'Usuario no encontrado :(' });
        }
    } catch (err) {
        console.error('Error en readUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un usuario en la base de datos
const createUser = async (req, res) => {
    try {
        const { correo, contraseña, nombre_completo, numero_identificacion } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!correo || !contraseña || !nombre_completo || !numero_identificacion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear el usuario
        const [result] = await userModel.createUser(correo, contraseña, nombre_completo, numero_identificacion);

        // Enviar respuesta de éxito
        res.json({ message: `Usuario creado con éxito. El id del usuario es: ${result.insertId}` });
    } catch (err) {
        console.error('Error en createUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un usuario en la base de datos
const updateUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { correo, contraseña, nombre_completo, numero_identificacion } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!correo || !contraseña || !nombre_completo || !numero_identificacion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar el usuario
        await userModel.updateUser(id_usuario, correo, contraseña, nombre_completo, numero_identificacion);

        // Enviar respuesta de éxito
        res.json({ message: 'Usuario actualizado con éxito' });
    } catch (err) {
        console.error('Error en updateUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un usuario en la base de datos
const deleteUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        // Validar que el ID del usuario esté presente
        if (!id_usuario) {
            return res.status(400).json({ message: 'El ID del usuario es obligatorio' });
        }

        // Llamar al modelo para eliminar el usuario
        await userModel.deleteUser(id_usuario);

        // Enviar respuesta de éxito
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        console.error('Error en deleteUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser,
};