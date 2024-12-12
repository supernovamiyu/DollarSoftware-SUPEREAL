const { Router } = require('express');

const { createDeliveryDetails, readDeliveryDetails, updateDeliveryDetails, deleteDeliveryDetails } = require('../controllers/detail-product.controller');

const router = Router();

router.get('/:id_detalle_pedido', readDeliveryDetails);

router.post('/', createDeliveryDetails);

router.put('/:id_detalle_pedido', updateDeliveryDetails);

router.delete('/:id_detalle_pedido', deleteDeliveryDetails);

module.exports = router;