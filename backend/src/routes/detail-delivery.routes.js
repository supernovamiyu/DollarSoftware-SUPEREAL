const { Router } = require('express');
const detailDeliveryController = require('../controllers/detail-delivery.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener un detalle de pedido por ID
router.get('/:fk_id_pedido', detailDeliveryController.readDeliveryDetails);

// Crear un nuevo detalle de pedido
router.post('/', detailDeliveryController.createDeliveryDetails);

// Actualizar un detalle de pedido por ID
router.put('/:fk_id_pedido', detailDeliveryController.updateDeliveryDetails);

// Eliminar un detalle de pedido por ID
router.delete('/:fk_id_pedido', detailDeliveryController.deleteDeliveryDetails);

// Exportar el enrutador
module.exports = router;