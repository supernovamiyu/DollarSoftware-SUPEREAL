const { Router } = require('express');

const { createCategory, readCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');

const router = Router();

router.get('/:id_categoria', readCategory);

router.post('/', createCategory);

router.put('/:id_categoria', updateCategory);

router.delete('/:id_categoria', deleteCategory);

module.exports = router;