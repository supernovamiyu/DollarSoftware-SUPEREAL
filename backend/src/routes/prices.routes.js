const { Router } = require('express');

const { createProductPrice, readProductPrice, updateProductPrice, deleteProductPrice } = require('../controllers/prices.controller');

const router = Router();

router.get('/:fk_id_producto', readProductPrice);

router.post('/', createProductPrice);

router.put('/:fk_id_producto', updateProductPrice);

router.delete('/:fk_id_producto', deleteProductPrice);

module.exports = router;