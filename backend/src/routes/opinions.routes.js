const { Router } = require('express');
const opinionsController = require('../controllers/opinions.controller');

// Crear un enrutador

const router = Router();

////////////////// R ****** U ****** T ****** A ****** S ////////////////
// Ruta para obtener una opinión por ID
router.get('/:id_opinion', opinionsController.readOpinion);

// Ruta para actualizar una opinión
router.put('/:id_opinion', opinionsController.updateOpinion);

// Ruta para eliminar una opinión
router.delete('/:id_opinion', opinionsController.deleteOpinion);

// Ruta para obtener la opinión de un producto
router.get('/:fk_id_productos', opinionsController.readOpinionProduct);

// Ruta para actualizar la opinión de un producto
router.put('/:id_opinion/:fk_id_productos', opinionsController.updateOpinionProduct);

// Ruta para eliminar la opinión de un producto
router.delete('/:id_opinion/:fk_id_productos', opinionsController.deleteOpinionProduct);

// Ruta para crear una nueva opinión
router.post('/', opinionsController.createOpinion);

// Ruta para crear una nueva opinión de un producto
router.post('/', opinionsController.createOpinionProduct);

module.exports = router;
