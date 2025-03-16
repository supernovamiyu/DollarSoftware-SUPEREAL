const { Router } = require('express');
const productController = require('../controllers/product.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener productos destacados
router.get('/destacados', productController.getFeaturedProducts);

// Buscar productos similares
router.get('/search/:searchTerm', productController.getSimilarProducts);

// Obtener un producto por ID
router.get('/:id_productos', productController.readProduct);

// Obtener productos por categoría
router.get('/categoria/:fk_id_categoria', productController.getProductCategory);

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Actualizar un producto por ID
router.put('/:id_productos', productController.updateProduct);

// Eliminar un producto por ID
router.delete('/:id_productos', productController.deleteProduct);

// Exportar el enrutador
module.exports = router;