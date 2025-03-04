const { Router } = require('express');

const { createProduct, readProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/product.controller');

const router = Router();

router.get('/', getAllProducts);

router.get('/:id_productos', readProduct);

router.post('/', createProduct);

router.put('/:id_productos', updateProduct);

router.delete('/:id_productos', deleteProduct);

module.exports = router;