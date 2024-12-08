const { Router } = require('express');

const { createCity, readCity, updateCity, deleteCity } = require('../controllers/city.controller');

const router = Router();

router.get('/:id_ciudad', readCity);

router.post('/', createCity);

router.put('/:id_ciudad', updateCity);

router.delete('/:id_ciudad', deleteCity);

module.exports = router;