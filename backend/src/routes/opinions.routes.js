const { Router } = require('express');
const opinionsController = require('../controllers/opinions.controller');

// Crear un enrutador

const router = Router();

////////////////// R ****** U ****** T ****** A ****** S ////////////////

// Ruta para crear una nueva opinión
router.post('/', opinionsController.createOpinion);

// Ruta para obtener una opinión por ID
router.get('/:id_opinion', opinionsController.readOpinion);

// Ruta para actualizar una opinión
router.put('/:id_opinion', opinionsController.updateOpinion);

// Ruta para eliminar una opinión
router.delete('/:id_opinion', opinionsController.deleteOpinion);

module.exports = router;
