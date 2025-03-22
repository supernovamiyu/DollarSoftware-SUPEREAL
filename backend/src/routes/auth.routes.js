const { Router } = require('express');
const authController = require('../controllers/auth.controller');

// Crear un enrutador
const router = Router();

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para obtener el perfil del usuario autenticado
// Esta ruta está protegida por el middleware verifyToken
router.get('/profile', authController.verifyToken, authController.getProfile);

// Exportar el enrutador
module.exports = router;