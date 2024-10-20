const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { listarDocumentos, registrarDocumento } = require('../controllers/Documento.controller');
const { listarPersonas } = require('../controllers/Persona.controller');
const { listarPlanificacionPrograma } = require('../controllers/PlanificacionPrograma.controller');

router.get('/documento', listarDocumentos);
router.post('/documento', upload.fields([{ name: 'archivo', maxCount: 1 }, { name: 'archivos_adicionales', maxCount: 1 }]), registrarDocumento);
router.get('/persona', listarPersonas);
router.get('/planificacion-programa', listarPlanificacionPrograma);


module.exports = router;