const { Router } = require('express');

const { createUserDelivery, readUserDelivery, updateUserDelivery, deleteUserDelivery } = require('../controllers/delivery.controller');

const router = Router();

router.get('/:id_pedido', readUserDelivery);

router.post('/', createUserDelivery);

router.put('/:id_pedido', updateUserDelivery);

router.delete('/:id_pedido', deleteUserDelivery);

module.exports = router;