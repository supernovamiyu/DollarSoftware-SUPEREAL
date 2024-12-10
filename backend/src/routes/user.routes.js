const { Router } = require('express');

const { createUser, readUser, updateUser, deleteUser } = require('../controllers/user.controller');

const router = Router();

router.get('/:id_usuario', readUser);

router.post('/', createUser);

router.put('/:id_usuario', updateUser);

router.delete('/:id_usuario', deleteUser);

module.exports = router;