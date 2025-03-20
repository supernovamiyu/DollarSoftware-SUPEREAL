const { Router } = require('express');
const userController = require('../controllers/user.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener un usuario por ID
router.get('/:id_usuario', userController.readUser);

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Actualizar un usuario por ID
router.put('/:id_usuario', userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id_usuario', userController.deleteUser);

// Exportar el enrutador
module.exports = router;