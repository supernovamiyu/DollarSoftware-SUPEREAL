const { Router } = require('express');
const categoryController = require('../controllers/category.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener una categoría por ID
router.get('/:id_categoria', categoryController.readCategory);

// Crear una nueva categoría
router.post('/', categoryController.createCategory);

// Actualizar una categoría por ID
router.put('/:id_categoria', categoryController.updateCategory);

// Eliminar una categoría por ID
router.delete('/:id_categoria', categoryController.deleteCategory);

// Exportar el enrutador
module.exports = router;