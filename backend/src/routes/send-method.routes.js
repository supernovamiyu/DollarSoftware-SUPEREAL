const { Router } = require('express');
const sendMethodController = require('../controllers/send-method.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener un método de envío por ID
router.get('/:id_metodo_envio', sendMethodController.readSendMethod);

// Crear un nuevo método de envío
router.post('/', sendMethodController.createSendMethod);

// Actualizar un método de envío por ID
router.put('/:id_metodo_envio', sendMethodController.updateSendMethod);

// Eliminar un método de envío por ID
router.delete('/:id_metodo_envio', sendMethodController.deleteSendMethod);

// Exportar el enrutador
module.exports = router;