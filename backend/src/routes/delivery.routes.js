const { Router } = require('express');
const deliveryController = require('../controllers/delivery.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener un pedido por ID
router.get('/:id_pedido', deliveryController.readUserDelivery);

// Crear un nuevo pedido
router.post('/', deliveryController.createUserDelivery);

// Actualizar un pedido por ID
router.put('/:id_pedido', deliveryController.updateUserDelivery);

// Eliminar un pedido por ID
router.delete('/:id_pedido', deliveryController.deleteUserDelivery);

// Exportar el enrutador
module.exports = router;