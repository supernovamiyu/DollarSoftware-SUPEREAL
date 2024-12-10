const { Router } = require('express');

const { createUserDelivery, readUserDelivery, updateUserDelivery, deleteUserDelivery } = require('../controllers/delivery.controller');

const router = Router();

router.get('/:fk_id_usuario', readUserDelivery);

router.post('/', createUserDelivery);

router.put('/:fk_id_usuario', updateUserDelivery);

router.delete('/:fk_id_usuario', deleteUserDelivery);

module.exports = router;