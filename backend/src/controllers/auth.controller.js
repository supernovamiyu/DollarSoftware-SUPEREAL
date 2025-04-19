// Importar el modelo de usuarios y dependencias necesarias
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Función para iniciar sesión
const login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!correo || !contraseña) {
            return res.status(400).json({ 
                mensaje: 'El correo y la contraseña son obligatorios' 
            });
        }

        // Buscar el usuario por correo
        const [result] = await userModel.findByEmail(correo);
        const usuario = result[0];

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({ 
                mensaje: 'Credenciales incorrectas' 
            });
        }

        // Verificar si la contraseña está hasheada (comienza con $2a$, $2b$ o $2y$)
        const isHashed = /^\$2[aby]\$\d+\$/.test(usuario.contraseña);
        
        let passwordMatch = false;
        
        if (isHashed) {
            // Si está hasheada, usar bcrypt.compare
            passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        } else {
            // Si no está hasheada, usar comparación directa (para compatibilidad)
            passwordMatch = contraseña === usuario.contraseña;
            
            // Opcional: Actualizar a hash para mayor seguridad
            if (passwordMatch) {
                console.log(`Actualizando contraseña de texto plano a hash para usuario: ${correo}`);
                await updateToHashedPassword(usuario.id_usuario, contraseña);
            }
        }

        if (!passwordMatch) {
            return res.status(401).json({ 
                mensaje: 'Credenciales incorrectas' 
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: usuario.id_usuario,
                correo: usuario.correo 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Enviar respuesta con token y datos del usuario
        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre_completo: usuario.nombre_completo,
                correo: usuario.correo
            }
        });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Función auxiliar para actualizar contraseñas de texto plano a hash
async function updateToHashedPassword(userId, plainPassword) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        
        // Actualizar la contraseña en la base de datos
        await userModel.updatePassword(userId, hashedPassword);
    } catch (error) {
        console.error('Error al actualizar a contraseña hasheada:', error);
    }
}

// Función para registrar un nuevo usuario
const register = async (req, res) => {
    try {
        const { correo, contraseña, nombre_completo, numero_identificacion } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!correo || !contraseña || !nombre_completo || !numero_identificacion) {
            return res.status(400).json({ 
                mensaje: 'Todos los campos son obligatorios' 
            });
        }

        // Verificar si el correo ya está registrado
        const [existingUser] = await userModel.findByEmail(correo);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ 
                mensaje: 'El correo electrónico ya está registrado' 
            });
        }

        // Hashear la contraseña antes de guardarla
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        // Crear el usuario con la contraseña hasheada
        const [result] = await userModel.createUser(
            correo, 
            hashedPassword, 
            nombre_completo, 
            numero_identificacion
        );

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: result.insertId,
                correo 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Enviar respuesta con token y datos del usuario
        res.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            token,
            usuario: {
                id_usuario: result.insertId,
                nombre_completo,
                correo
            }
        });
    } catch (err) {
        console.error('Error en register:', err);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
// Función para obtener el perfil del usuario autenticado
const getProfile = async (req, res) => {
    try {
        // El middleware de autenticación ya ha verificado el token
        // y ha añadido el usuario al objeto req
        const userId = req.user.id;

        // Obtener los datos del usuario
        const [result] = await userModel.readUser(userId);
        const usuario = result[0];

        if (!usuario) {
            return res.status(404).json({ 
                mensaje: 'Usuario no encontrado' 
            });
        }

        // Enviar datos del usuario (excluyendo la contraseña)
        res.json({
            id_usuario: usuario.id_usuario,
            nombre_completo: usuario.nombre_completo,
            correo: usuario.correo,
            numero_identificacion: usuario.numero_identificacion
        });
    } catch (err) {
        console.error('Error en getProfile:', err);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            mensaje: 'No autorizado. Token no proporcionado' 
        });
    }

    // Extraer el token
    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Añadir el usuario decodificado al objeto req
        req.user = decoded;
        
        // Continuar con la siguiente función
        next();
    } catch (err) {
        console.error('Error al verificar token:', err);
        return res.status(401).json({ 
            mensaje: 'No autorizado. Token inválido' 
        });
    }
};

// Exportar las funciones
module.exports = {
    login,
    register,
    getProfile,
    verifyToken
};