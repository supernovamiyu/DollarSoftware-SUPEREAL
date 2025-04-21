const { Router } = require('express');
const userController = require('../controllers/user.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener un usuario por ID
router.get('/:id_usuario', userController.readUser);

// Obtener un usuario por su correo electrónico
router.get('/email/:correo', userController.findByEmail)

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Actualizar un usuario por ID
// Ruta protegida por el middleware verifyToken
router.put('/:id_usuario', userController.verifyToken, userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id_usuario', userController.deleteUser);

// Exportar el enrutador
module.exports = router;