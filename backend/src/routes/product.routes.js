const { Router } = require('express');

const { createProduct, readProduct, updateProduct, deleteProduct, getAllProducts, getProductCategory, getFeaturedProducts, getSimilarProducts } = require('../controllers/product.controller');

const router = Router();

router.get('/', getAllProducts);

router.get('/destacados', getFeaturedProducts);

router.get('/search/:searchTerm', getSimilarProducts);

router.get('/:id_productos', readProduct);

router.get('/categoria/:fk_id_categoria', getProductCategory);

router.post('/', createProduct);

router.put('/:id_productos', updateProduct);

router.delete('/:id_productos', deleteProduct);

module.exports = router;