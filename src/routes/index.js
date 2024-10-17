const express = require('express');
const router = express.Router();

const { listarDocumentos } = require('../controllers/Documento.controller');

router.get('/documentos', listarDocumentos);


module.exports = router;