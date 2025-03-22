// Importar el modelo de usuarios y dependencias necesarias
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

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

        // Verificar la contraseña (comparación simple para desarrollo)
        const passwordMatch = contraseña === usuario.contraseña;

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

        // Crear el usuario
        const [result] = await userModel.createUser(
            correo, 
            contraseña, 
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