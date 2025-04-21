// Importar el modelo de usuarios y 
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token de autenticación requerido'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Token de autenticación inválido o expirado'
        })
    }

};

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
// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { correo, contraseña, nombre_completo } = req.body;

        // Verificación de autorización
        if (req.user.id !== parseInt(id_usuario)) {
            return res.status(403).json({ 
                success: false,
                message: 'No tienes permiso para modificar estos datos',
                debug: {
                    userIdInToken: req.user.id,
                    userIdInRequest: id_usuario
                }
            });
        }

        // Validación de campos
        if (!correo || !nombre_completo) {
            return res.status(400).json({ 
                success: false,
                message: 'Campos obligatorios faltantes',
                required_fields: ['correo', 'nombre_completo']
            });
        }

        // Actualización condicional
        let updateResult;
        if (contraseña) {
            updateResult = await userModel.updateUser(
                id_usuario,
                correo,
                contraseña,
                nombre_completo,
            );
        } else {
            updateResult = await userModel.updateUserWithoutPassword(
                id_usuario,
                correo,
                nombre_completo,
            );
        }

        // Obtener datos actualizados
        const [updatedUser] = await userModel.readUser(id_usuario);
        const { contraseña: _, ...userData } = updatedUser[0];

        res.json({ 
            success: true,
            message: 'Usuario actualizado con éxito',
            user: userData
        });

    } catch (err) {
        console.error('Error en updateUser:', err);
        
        if (err.code === 'ER_DUP_ENTRY') {
            // Extraer el campo duplicado del mensaje de error
            let duplicatedField = 'datos';
            const errorMessage = err.sqlMessage.toLowerCase();
            
            if (errorMessage.includes('correo')) {
                duplicatedField = 'correo electrónico';
            } else if (errorMessage.includes('telefono')) {
                duplicatedField = 'teléfono';
            }
            
            return res.status(409).json({ 
                success: false,
                message: `El ${duplicatedField} ya está en uso por otro usuario`,
                duplicated_field: duplicatedField,
                error_code: 'DUPLICATED_ENTRY'
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: 'Error al actualizar usuario' 
        });
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

const findByEmail = async (req, res) => {
    try {
        const { correo } = req.params;

        if (!correo) {
            return res.status(400).json({  message: 'El correo electrónico es obligatorio' });
        }

        // Llamar al modelo para buscar el usuario por email
        const [result] = await userModel.findByEmail(correo)

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
}

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser,
    verifyToken,
    findByEmail
};