const { Router } = require('express');

const { createDeliveryState, readDeliveryState, updateDeliveryState, deleteDeliveryState } = require('../controllers/delivery-state.controller');

const router = Router();

router.get('/:id_estado_envio', readDeliveryState);

router.post('/', createDeliveryState);

router.put('/:id_estado_envio', updateDeliveryState);

router.delete('/:id_estado_envio', deleteDeliveryState);

module.exports = router;