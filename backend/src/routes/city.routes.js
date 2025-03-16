const { Router } = require('express');
const cityController = require('../controllers/city.controller');

// Crear un enrutador
const router = Router();

///////////////// R ****** U ****** T ****** A ****** S /////////////////

// Obtener una ciudad por ID
router.get('/:id_ciudad', cityController.readCity);

// Crear una nueva ciudad
router.post('/', cityController.createCity);

// Actualizar una ciudad por ID
router.put('/:id_ciudad', cityController.updateCity);

// Eliminar una ciudad por ID
router.delete('/:id_ciudad', cityController.deleteCity);

// Exportar el enrutador
module.exports = router;