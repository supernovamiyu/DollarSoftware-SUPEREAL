const { Router } = require('express');
const opinionsController = require('../controllers/opinions.controller');

// Crear un enrutador

const router = Router();

////////////////// R ****** U ****** T ****** A ****** S ////////////////

// Ruta para obtener la opinión de un producto
router.get('/:fk_id_productos', opinionsController.readOpinionProduct);

// Ruta para actualizar la opinión de un producto
router.put('/:id_opinion/:fk_id_productos', opinionsController.updateOpinionProduct);

// Ruta para eliminar la opinión de un producto
router.delete('/:id_opinion/:fk_id_productos', opinionsController.deleteOpinionProduct);

// Ruta para crear una nueva opinión de un producto
router.post('/', opinionsController.createOpinionProduct);

module.exports = router;
