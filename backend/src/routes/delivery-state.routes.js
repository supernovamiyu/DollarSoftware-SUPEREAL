const { Router } = require('express');
const deliveryStateController = require('../controllers/delivery-state.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener un estado de envío por ID
router.get('/:id_estado_envio', deliveryStateController.readDeliveryState);

// Crear un nuevo estado de envío
router.post('/', deliveryStateController.createDeliveryState);

// Actualizar un estado de envío por ID
router.put('/:id_estado_envio', deliveryStateController.updateDeliveryState);

// Eliminar un estado de envío por ID
router.delete('/:id_estado_envio', deliveryStateController.deleteDeliveryState);

// Exportar el enrutador
module.exports = router;