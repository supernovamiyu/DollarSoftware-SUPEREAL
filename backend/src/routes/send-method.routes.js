const { Router } = require('express');

const { createSendMethod, readSendMethod, updateSendMethod, deleteSendMethod } = require('../controllers/send-method.controller');

const router = Router();

router.get('/:id_metodo_envio', readSendMethod);

router.post('/', createSendMethod);

router.put('/:id_metodo_envio', updateSendMethod);

router.delete('/:id_metodo_envio', deleteSendMethod);

module.exports = router;